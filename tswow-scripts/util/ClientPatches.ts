 export interface ClientPatch {
    address: number
    values: number[]
}

export interface ClientPatchCat {
    name: string
    patches: ClientPatch[]
}

export function patch(name: string, patches: [number,number[]][]): ClientPatchCat
{
    return {name,patches:patches.map(x=>({address:x[0],values:x[1]}))}
}

export const EXTENSION_DLL_PATCH_NAME = 'client-extensions'
export const ITEM_DBC_DISABLER_PATCH_NAME = 'item-dbc-disabler'
export const FIX_COMBO_POINT_PATCH_NAME = 'fix-combo-points'

export function ClientPatches(
    gamebuild: number
    , roles: {class:number,tank:number,healer:number,damage:number,leader:number}[]
    ) {
        let rolemask: number[] = new Array(32).fill(0)
        roles.forEach(x=>{
            rolemask[x.class-1] =
              (x.leader ? 1 : 0)
            | (x.tank   ? 2 : 0)
            | (x.healer ? 4 : 0)
            | (x.damage ? 8 : 0)
        })
        return [
            patch('large-address-aware',[
                [0x000126,[0x23]]
            ]),
            patch('view-distacnce-unlock',[
                [0x014137,[0x10,0x27]],
                [0x4c99f0,[0x34]],
                [0x63cf0c,[
                    0x00,0x40,0x1c,0x46,0x00,0x40,0x1c,0x46
                ]],
            ]),
            patch(FIX_COMBO_POINT_PATCH_NAME,[
                [0x210b12,[
                    0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90
                ]],
            ]),
            patch('allow-custom-gluexml',[
                [0x126,[0x23]],
                [0x1f41bf,[0xeb]],
                [0x415a25,[0xeb]],
                [0x415a3f,[0x3]],
                [0x415a95,[0x3]],
                [0x415b46,[0xeb]],
                [0x415b5f,[0xb8,0x03]],
                [0x415b61,[0x0,0x0,0x0,0xeb,0xed]],
            ]),
            patch('unlimited race/class pairs patch', [
                [0xe0355,[0x78]],
                [0xe038e,[0x88]],
                [0xe03a3,[0x88]],
                [0xe03c3,[0x88]],
            ]),
            patch('class roles',[
                // role mask cave
                [0x005E1A37,[0,...rolemask]],
                // xrefs
                [0x151d48,[0x37,0x32,0x9E,0x00]],
                [0x152f7d,[0x37,0x32,0x9E,0x00]],
                [0x152f94,[0x37,0x32,0x9E,0x00]],
                [0x1531e7,[0x37,0x32,0x9E,0x00]],
                [0x153d22,[0x37,0x32,0x9E,0x00]],
            ]),
            // from https://model-changing.net/index.php?app=downloads&module=downloads&controller=view&id=314
            // credits to kebabstorm, original tbc version by BenjaminLSR and rajkosto
            patch(ITEM_DBC_DISABLER_PATCH_NAME,[
                [0x168,[0x5a,0xc5,0x75]],
                [0x11646d,[0x56,0x89,0xe1,0xe8,0xdb,0x1d,0x24,0x0,0x83,0xc4,0x4,0x89,0xc6,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90]],
                [0x1164ac,[0x89,0xf1,0x90]],
                [0x1223f7,[0x56,0x89,0xe1,0xe8,0x51,0x5e,0x23,0x0,0x83,0xc4,0x4,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90]],
                [0x122419,[0x89,0xc7,0x90]],
                [0x1a54ef,[0x90,0x90,0x90,0x90,0x90,0x90,0x8d,0x4d,0xf4]],
                [0x1a54f9,[0x53,0x2d,0x1b]],
                [0x1a5528,[0x90,0x90,0x90]],
                [0x1a552c,[0x45,0xf4]],
                [0x1a572e,[0x90,0x90,0x90,0x90,0x90,0x90,0x89,0xd9]],
                [0x1a5737,[0x15,0x2b,0x1b]],
                [0x1a575c,[0x90,0x90,0x90]],
                [0x1a5760,[0x4d,0xf8]],
                [0x1a7cf5,[0x83,0xc4,0x4,0x56,0x89,0xe1,0xe8,0xd0,0x4,0x1b,0x0,0x83,0xc4,0x4,0xeb,0x17,0xcc,0x89,0xc3,0x89,0xe1,0xe8,0x41,0x5,0x1b]],
                [0x1a7d0f,[0x83,0xc4,0x4,0xe9,0x6b,0x33,0x0,0x0,0xcc,0xcc,0xcc,0xcc,0xcc,0x85,0xc0]],
                [0x1a8c8e,[0x89,0xe1,0xe8,0xbb,0xf5,0x1a,0x0,0x83,0xc4,0x4]],
                [0x1a8c9c,[0x90,0x90,0x90]],
                [0x1aa6d4,[0x89,0xe1,0xe8,0x75,0xdb,0x1a,0x0,0x83,0xc4,0x4]],
                [0x1aa6e2,[0x90,0x90,0x90]],
                [0x1aa821,[0x90,0x8d,0x4d,0x8,0xe8,0xa6,0xd9,0x1a]],
                [0x1aa82a,[0x8b,0xf8,0xe9,0x67,0xbe,0x15,0x0]],
                [0x1aa832,[0xc0]],
                [0x1aa86c,[0x90,0x89,0xf8]],
                [0x1aa8a2,[0x89,0xe1,0xe8,0xa7,0xd9,0x1a,0x0,0x83,0xc4,0x4]],
                [0x1aa8b0,[0x90,0x90,0x90]],
                [0x1aa9d0,[0x89,0xe1,0xe8,0x79,0xd8,0x1a,0x0,0x83,0xc4,0x4]],
                [0x1aa9de,[0x90,0x90,0x90]],
                [0x1aaafa,[0x89,0xe1,0xe8,0x4f,0xd7,0x1a,0x0,0x83,0xc4,0x4]],
                [0x1aab08,[0x90,0x90,0x90]],
                [0x1ab076,[0x89,0xe1,0xe8,0x53,0xd1,0x1a,0x0,0xe9,0x84,0xcc,0xff,0xff]],
                [0x1ab083,[0xc0]],
                [0x1ab0a9,[0x90,0x90,0x85,0xdb]],
                [0x1ab316,[0x89,0xe1,0xe8,0x33,0xcf,0x1a,0x0,0x83,0xc4,0x4]],
                [0x1ab324,[0x90,0x90,0x90]],
                [0x306614,[0x8b,0x41,0x8,0x8d,0x48,0xc,0xe9,0x11,0x1b,0x5,0x0]],
                [0x306620,[0xeb,0xf2,0xcc,0xcc,0xcc,0xcc]],
                [0x306650,[0xeb,0x3a,0xcc,0xcc,0xcc,0xcc]],
                [0x306683,[0x8d,0x48]],
                [0x306686,[0xe9,0x45,0x1b,0x5,0x0,0xcc,0x8b,0x41,0x8,0x8d,0x48,0xc,0xe9,0xe9,0x1a,0x5,0x0,0xcc,0x8d,0x4d,0x8,0xe8,0xb0,0x1b,0x5]],
                [0x3066a0,[0xe9,0x8c,0x41,0xea,0xff,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc]],
                [0x306703,[0x8d,0x48]],
                [0x306706,[0xe9,0x45,0x1b,0x5,0x0,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc]],
                [0x306733,[0x8d,0x48]],
                [0x306736,[0xe9,0x15,0x1c,0x5,0x0,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc,0xcc]],
                [0x309e03,[0x8d,0x48]],
                [0x309e06,[0xe8,0x45,0xe4,0x4,0x0,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90,0x90]],
                [0x358136,[0x56,0x8b,0x31,0x89,0xf0]],
                [0x35813c,[0x1,0x99,0x6a,0x0,0x68,0x70,0xeb,0x5e,0x0,0x33,0xc2,0x8d,0x4d,0xf8,0x51,0x2b,0xc2,0x50,0xb9,0x28,0xd8,0xc5,0x0,0xc7,0x45,0xf8]],
                [0x358157,[0x0,0x0,0x0,0xc7,0x45,0xfc]],
                [0x35815e,[0x0,0x0,0x0,0xe8,0xca,0x3c,0xf2,0xff,0x85,0xc0,0x74,0x8]],
                [0x35816b,[0x40,0x4,0x5e,0x8b,0xe5,0x5d,0xc3,0x89,0xf0,0x5e,0x89,0xec,0x5d,0xe9,0xa9,0xe4,0xfa,0xff]],
                [0x358186,[0x56,0x8b,0x31,0x89,0xf0]],
                [0x35818c,[0x1,0x99,0x6a,0x0,0x68,0x70,0xeb,0x5e,0x0,0x33,0xc2,0x8d,0x4d,0xf8,0x51,0x2b,0xc2,0x50,0xb9,0x28,0xd8,0xc5,0x0,0xc7,0x45,0xf8]],
                [0x3581a7,[0x0,0x0,0x0,0xc7,0x45,0xfc]],
                [0x3581ae,[0x0,0x0,0x0,0xe8,0x7a,0x3c,0xf2,0xff,0x85,0xc0,0x74]],
                [0x3581bb,[0x40,0x8,0x5e,0x8b,0xe5,0x5d,0xc3,0x89,0xf0,0x5e,0x89,0xec,0x5d,0xe9,0x89,0xe4,0xfa,0xff]],
                [0x61be58,[0x7c,0x7c]]
            ]),
            patch(EXTENSION_DLL_PATCH_NAME,[
                // stage
                [0x28e19c,[
                    // Jump to hook (replaces "LoadLibraryA")
                    0xE9,0x19,0x57,0x0E,0x00,
                    // pad old instruction
                    0x90
                ]],

                // cave
                [0x3738b8,[
                    // short jump 26 bytes (past code cave)
                    0xEB, 0x26,
                    // call "LoadLibraryA" (for d3d9.dll) (this is what we jump to)
                    0xFF, 0x15, 0x48, 0xF2, 0x9D, 0x00,
                    // push all registers
                    0x60,
                    // push "ClienbtExtensions.dll" string (see below)
                    0x68, 0x71, 0x42, 0x9E, 0x00,
                    // call "LoadLibraryA" (for ClientExtensions.dll)
                    0xFF, 0x15, 0x48, 0xF2, 0x9D, 0x00,
                    // pop all registers
                    0x61,
                    // jump back
                    0xE9, 0xD0, 0xA8, 0xF1, 0xFF
                ]],
                // "ClientExtensions.dll" string
                [0x5e2a71,[0x43,0x6C,0x69,0x65,0x6E,0x74,0x45,0x78,0x74,0x65,0x6E,0x73,0x69,0x6F,0x6E,0x73,0x2E,0x64,0x6C,0x6C]]
            ]),
            patch('gamebuild',[
                [0x4c99f0,[
                    gamebuild&0xff,
                    (gamebuild>>8)&0xff
                ]]
            ])
        ]
}
