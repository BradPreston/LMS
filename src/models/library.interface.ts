export interface ILibrary<T> {
	getAll(): Promise<T[]>;
	getOne(id: string): Promise<T>;
}
