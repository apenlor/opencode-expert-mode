import { promises as fs } from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

export interface Frontmatter {
  name: string;
  description: string;
}

export interface Skill {
  path: string;
  skillFile: string;
  name: string;
  description: string;
  sourceType: 'personal' | 'global';
}

export interface ResolvedSkill {
  skillFile: string;
  sourceType: 'personal' | 'global';
  skillPath: string;
}

/**
 * Extract YAML frontmatter from a skill file.
 */
export function extractFrontmatter(filePath: string): Frontmatter {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const lines = content.split('\n');

        let inFrontmatter = false;
        let name = '';
        let description = '';

        for (const line of lines) {
            if (line.trim() === '---') {
                if (inFrontmatter) break;
                inFrontmatter = true;
                continue;
            }

            if (inFrontmatter) {
                const match = line.match(/^(\w+):\s*(.*)$/);
                if (match) {
                    const [, key, value] = match;
                    switch (key) {
                        case 'name':
                            name = value.trim();
                            break;
                        case 'description':
                            description = value.trim();
                            break;
                    }
                }
            }
        }
        return { name, description };
    } catch (error) {
        return { name: '', description: '' };
    }
}

/**
 * Find all SKILL.md files in a directory recursively.
 */
export function findSkillsInDir(dir: string, sourceType: 'personal' | 'global', maxDepth = 3): Skill[] {
    const skills: Skill[] = [];

    if (!fs.existsSync(dir)) return skills;

    function recurse(currentDir: string, depth: number) {
        if (depth > maxDepth) return;

        const entries = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const entry of entries) {
            const fullPath = path.join(currentDir, entry.name);

            if (entry.isDirectory()) {
                const skillFile = path.join(fullPath, 'SKILL.md');
                if (fs.existsSync(skillFile)) {
                    const { name, description } = extractFrontmatter(skillFile);
                    skills.push({
                        path: fullPath,
                        skillFile: skillFile,
                        name: name || entry.name,
                        description: description || '',
                        sourceType: sourceType
                    });
                }
                recurse(fullPath, depth + 1);
            }
        }
    }

    recurse(dir, 0);
    return skills;
}

/**
 * Resolve a skill name to its file path, handling shadowing.
 */
export function resolveSkillPath(skillName: string, globalSkillsDir: string, personalDir: string): ResolvedSkill | null {
    if (personalDir) {
        const personalPath = path.join(personalDir, skillName);
        const personalSkillFile = path.join(personalPath, 'SKILL.md');
        if (fs.existsSync(personalSkillFile)) {
            return {
                skillFile: personalSkillFile,
                sourceType: 'personal',
                skillPath: skillName
            };
        }
    }

    if (globalSkillsDir) {
        const globalPath = path.join(globalSkillsDir, skillName);
        const globalSkillFile = path.join(globalPath, 'SKILL.md');
        if (fs.existsSync(globalSkillFile)) {
            return {
                skillFile: globalSkillFile,
                sourceType: 'global',
                skillPath: skillName
            };
        }
    }

    return null;
}

/**
 * Check if a git repository has updates available.
 */
export function checkForUpdates(repoDir: string): boolean {
    try {
        const output = execSync('git fetch origin && git status --porcelain=v1 --branch', {
            cwd: repoDir,
            timeout: 3000,
            encoding: 'utf8',
            stdio: 'pipe'
        });

        const statusLines = output.split('\n');
        for (const line of statusLines) {
            if (line.startsWith('## ') && line.includes('[behind ')) {
                return true;
            }
        }
        return false;
    } catch (error) {
        return false;
    }
}

/**
 * Strip YAML frontmatter from skill content.
 */
export function stripFrontmatter(content: string): string {
    const lines = content.split('\n');
    let inFrontmatter = false;
    let frontmatterEnded = false;
    const contentLines: string[] = [];

    for (const line of lines) {
        if (line.trim() === '---') {
            if (inFrontmatter) {
                frontmatterEnded = true;
                continue;
            }
            inFrontmatter = true;
            continue;
        }

        if (frontmatterEnded || !inFrontmatter) {
            contentLines.push(line);
        }
    }

    return contentLines.join('\n').trim();
}
