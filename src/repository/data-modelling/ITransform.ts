interface ITransform<T, DTO> {
    toObject (dto: DTO): T;
    toStorage (object: T): DTO;
}

export default ITransform;