export const enter = (
  event: React.KeyboardEvent,
  action: () => Promise<void>
) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    action();
  }
};
