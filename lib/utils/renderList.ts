export const renderList = <T>(
  items: T[],
  render: (item: T, i: number) => string,
) => items.map(render).join("");
