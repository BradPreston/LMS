export interface ILibrary<T> {
	getAll(): Promise<T[]>;
	getOne(id: string): Promise<T>;
	insertOne(data: T): Promise<T>;
	updateOne(id: string, data: T): Promise<T>;
	deleteOne(id: string): Promise<void>;
}
