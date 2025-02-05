import { GUID, UTCDate } from "../readonly";

export type Entity = {
    id: GUID;
    createdAt: UTCDate;
}

export type ModifiableEntity = {
    id: Readonly<number|GUID>;
    createdAt: UTCDate;
    modifiedAt: UTCDate;
}

export const EntitySorter = (a:Entity, b: Entity) => b.createdAt.getTime() - a.createdAt.getTime();
    