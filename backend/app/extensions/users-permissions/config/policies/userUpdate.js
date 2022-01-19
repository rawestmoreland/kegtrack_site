module.exports = async (ctx, next) => {
  // If the user is an administrator we allow them to perform this action unrestricted
  if (ctx.state.user.role.name === "Administrator") {
    return next();
  }

  const { id: currentUserId } = ctx.state.user;
  // If you are using MongoDB do not parse the id to an int!
  const userToUpdate = Number.parseInt(ctx.params.id, 10);

  if (currentUserId !== userToUpdate) {
    return ctx.unauthorized("Unable to edit this user ID");
  }

  // Extract the fields regular users should be able to edit
  const { remaining_units, volume_units, name_first, name_last, username } =
    ctx.request.body;

  // Provide custom validation policy here
  if (remaining_units && remaining_units.trim() === "") {
    return ctx.badRequest("Remaining units is required");
  }
  if (volume_units && volume_units.trim() === "") {
    return ctx.badRequest("Volume units is required");
  }
  if (name_first && name_first.trim() === "") {
    return ctx.badRequest("First name is required");
  }
  if (name_last && name_last.trim() === "") {
    return ctx.badRequest("Last name is required");
  }
  if (username && username.trim() === "") {
    return ctx.badRequest("Username is required");
  }

  // Setup the update object
  const updateData = {
    remaining_units,
    volume_units,
    name_first,
    name_last,
    username,
  };

  // remove properties from the update object that are undefined (not submitted by the user in the PUT request)
  Object.keys(updateData).forEach(
    (key) => updateData[key] === undefined && delete updateData[key]
  );
  if (Object.keys(updateData).length === 0) {
    return ctx.badRequest("No data submitted");
  }

  ctx.request.body = updateData;
  return next();
};
