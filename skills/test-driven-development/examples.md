## Extended TDD Notes

### Good Test Shape
- One behavior per test
- Prefer behavior assertions over implementation details
- Split tests when a name contains multiple responsibilities

### Bug Fix Example

```typescript
test('rejects empty email', async () => {
  const result = await submitForm({ email: '' })
  expect(result.error).toBe('Email required')
})
```

Expected red phase: the test fails because empty email is currently accepted.

```typescript
function submitForm(data: FormData) {
  if (!data.email?.trim()) return { error: 'Email required' }
  // ...
}
```

Expected green phase: the focused test passes and the surrounding suite remains green.

### When Stuck
- Do not know how to test: write the wished-for API and assertion first
- Test too complicated: simplify the design
- Must mock everything: decouple the code
- Test setup huge: extract helpers or simplify the interface
