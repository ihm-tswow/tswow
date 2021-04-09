import { Subsystem } from "wotlkdata/cell/Subsystem";
import { SpellVisualEffectNameRow } from "wotlkdata/dbc/types/SpellVisualEffectName";

export class VisualScale<T> extends Subsystem<T> {
    protected row: SpellVisualEffectNameRow;

    constructor(owner: T, row: SpellVisualEffectNameRow) {
        super(owner);
        this.row = row;
    }

    get Min() { return this.ownerWrap(this.row.MinAllowedScale); }
    get Max() { return this.ownerWrap(this.row.MaxAllowedScale); }
    get Scale() { return this.ownerWrap(this.row.Scale); }

    set(scale: number, min: number, max: number) {
        this.Min.set(min);
        this.Max.set(max);
        this.Scale.set(scale);
        return this.owner;
    }
}

export class SpellVisualEffect<T> extends Subsystem<T> {
    row: SpellVisualEffectNameRow;
    
    constructor(owner: T, row: SpellVisualEffectNameRow) {
        super(owner);
        this.row = row;
    }

    get Name() { return this.wrap(this.row.Name); }
    get Filename() { return this.wrap(this.row.FileName); }
    get AreaSize() { return this.wrap(this.row.AreaEffectSize); }
    get Scale() { return new VisualScale(this.owner, this.row); }
}