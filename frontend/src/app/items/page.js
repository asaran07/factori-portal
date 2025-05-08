async function getItems() {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/items/`;
  console.log(`workspacing items from: ${apiUrl}`);

  try {
    const res = await fetch(apiUrl, {cache: 'no-store'});

    if (!res.ok) {
      console.error(`API request failed: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch items: ${res.status}`);
    }
    
    const data = await res.json();
    return data;

  } catch (error) {
    console.error("Error fetching items: ", error);
    return [];
  }
}

export default async function ItemsPage() {
  const items = await getItems();

  return (
    <div>
      <h1>Items List</h1>
      {items && items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.item_id}>
              <strong>{item.item_name}:</strong> {item.description || 'No description'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items found or failed to load items.</p>
      )}
    </div>
  );
}
