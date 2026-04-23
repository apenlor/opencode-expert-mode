## Extended Debugging Reference

### Root Cause Tracing
Trace backward through the call chain until you find the original trigger, then fix at the source instead of at the visible symptom.

1. Observe the symptom
2. Find the immediate cause
3. Ask what called it and with which values
4. Keep tracing upstream
5. Fix the origin

When manual tracing is not enough, add temporary instrumentation at the boundary:

```typescript
console.error('DEBUG:', { inputValue, cwd: process.cwd(), stack: new Error().stack })
```

### Defense in Depth
- Validate at the entry point
- Validate business invariants in core logic
- Add environment guards for dangerous operations
- Add temporary debug instrumentation when evidence is missing

### Condition-Based Waiting
Wait for the actual condition, not guessed timing.

- Wait for event: `waitFor(() => events.find(e => e.type === 'DONE'))`
- Wait for state: `waitFor(() => machine.state === 'ready')`
- Wait for file: `waitFor(() => fs.existsSync(path))`
