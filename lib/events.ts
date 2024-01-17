export const enter = (
  event: React.KeyboardEvent,
  action: () => Promise<void>
) => {
  if (event.key === "Enter") {
    action();
  }
};
