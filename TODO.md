# TODO: Fix Vehicle Details Saving for Drivers

## Steps to Complete:
- [x] Update AuthContext.jsx: Add refetchUser function to reload currentUser after vehicle updates
- [x] Update VehicleDetailsForm.jsx: Call refetchUser after successful save and add navigation if no onComplete
- [x] Update DriverDashboard.jsx: Pass onComplete prop to VehicleDetailsForm for navigation after save
- [x] Update backend/routes/users.cjs: Add driver-only check in POST /vehicle_details route

## Testing Steps:
- [ ] Test save flow: Login as driver → Navigate to /driver/vehicle_details → Fill form → Save → Verify success toast, navigation, and updated vehicle in profile
- [ ] Check backend logs for successful saves
- [ ] Ensure no errors in console or UI
