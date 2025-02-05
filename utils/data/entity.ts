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