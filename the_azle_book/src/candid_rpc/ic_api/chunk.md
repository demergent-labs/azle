# chunk

Process data in chunks for memory efficiency.

```typescript
import { chunk, IDL, update } from 'azle';

export default class {
    @update([IDL.Vec(IDL.Nat8), IDL.Nat], IDL.Vec(IDL.Vec(IDL.Nat8)))
    processInChunks(data: Uint8Array, chunkSize: number): Uint8Array[] {
        return chunk(data, chunkSize);
    }

    @update([IDL.Vec(IDL.Text), IDL.Nat], IDL.Vec(IDL.Text))
    processTextChunks(texts: string[], chunkSize: number): string[] {
        const chunks = chunk(texts, chunkSize);

        return chunks.map((chunk) => chunk.join(' | '));
    }
}
```

The `chunk` function splits arrays or data into smaller chunks of a specified size, useful for memory management and batch processing.

**Parameters:**

- `data`: Array or Uint8Array to chunk
- `size`: Maximum size of each chunk (`number`)

**Returns:** Array of chunks

**Use Cases:**

- Process large datasets in smaller batches
- Memory-efficient data handling
- Pagination implementation
- Streaming data processing

**Important Notes:**

- Last chunk may be smaller than the specified size
- Works with both arrays and Uint8Array
- Useful for avoiding memory limits with large data
- Essential for processing large files or datasets
