// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Events({ events }: any) {
  return (
    <ul>
      {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        events.map((event: any, index: any) => (
          <li key={index}>{event}</li>
        ))
      }
    </ul>
  );
}
