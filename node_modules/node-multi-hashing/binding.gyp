{
    "targets": [
        {
            "target_name": "multihashing",
            "sources": [
                "multihashing.cc",
                "aes128.c",
                "blake2s.c",
                "blake2s256.c",
                "camellia128.c",
                "common.c",
                "crc32.c",
                "des.c",
                "gost.c",
                "haval5_256.c",
                "hmac_md5.c",
                "jtr_crc32.c",
                "jtr_gost.c",
                "jtr_haval.c",
                "jtr_skein.c",
                "keccak1600.c",
                "my_time.c",
                "oneWayFunction.c",
                "rc4.c",
                "ripemd160.c",
                "sha1.c",
                "sha3_256.c",
                "sha256.c",
                "sha512.c",
                "skein512_256.c",
                "whirlpool.c",
                "PoW.c"
            ],
            "include_dirs": [
                "crypto",
                "<!(node -e \"require('nan')\")",
            ],
            "cflags": [
                "-D_GNU_SOURCE -maes -fPIC -Ofast -flto -fuse-linker-plugin -funroll-loops -funswitch-loops -fpeel-loops -std=c99"
            ],
            "cflags!": [ 
                "-O2", "-fno-strict-aliasing", "-fno-tree-vrp", "-fno-omit-frame-pointer"
            ],
            "ldflags": [
                "-fPIC -Ofast -flto -fuse-linker-plugin"
            ],
            "cflags_cc": [
                "-std=c++0x -maes -march=native"
            ],
            "conditions": [
                ["OS==\"mac\"", {
                    "defines": ["SYS_OS_MAC"]
                }]
            ]
        }
    ]
}
