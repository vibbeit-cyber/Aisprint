# Fix Next.js Dynamic Route Conflict - Route Unification

## Current Progress
- [x] Create TODO.md ✅

## Step 1: Folder Renames
- [x] Rename `apps/web/src/app/dashboard/course/[courseType]` → `[courseSlug]` ✅
- [x] Rename `apps/web/src/app/dashboard/course/[id]` → `[courseId]` ✅

## Step 2: Code Updates
- [x] Update `[courseSlug]/page.tsx` - params.courseType → params.courseSlug ✅
- [ ] Update `[courseSlug]/payment/page.tsx`
- [ ] Update `[courseSlug]/success/page.tsx`
- [x] Update `[courseId]/page.tsx` - params.id → params.courseId ✅

## Step 3: Testing
- [ ] Stop dev server (Ctrl+C)
- [ ] Run `npm run dev` in apps/web
- [ ] Verify no routing errors
- [ ] Test /dashboard/course/* routes

## Step 4: Final Checks
- [ ] Update TODO.md with completion status
- [ ] attempt_completion

