export type PlayerAchievementData = {
    achievementId: number,
    date: number,
}

type AddonPlayerData = {
    name: string,
    race: string,
    class: string,
    time: Date,
    achievements: PlayerAchievementData[]
}

type AddonExportData = {
    realm: string,
    guild: string,
    playersData: AddonPlayerData[]
}


const ACHIEVEMENT_IDS_01 = [6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 73, 116, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 137, 141, 144, 150, 153, 154, 155, 156, 157, 158, 159, 161, 162, 165, 166, 167, 168, 199, 200, 201, 202, 203, 204, 206, 207, 208, 209, 211, 212, 213, 214, 216, 218, 219, 220, 221, 222, 223, 225, 226, 227, 229, 230, 231, 233, 238, 239, 245, 246, 247, 248, 249, 252, 255, 260, 263, 271, 272, 273, 275, 277, 279, 283, 284, 288, 289, 291, 292, 293, 295, 303, 306, 388, 389, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 411, 412, 414, 415, 416, 418, 419, 420, 424, 425, 426, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 470, 471, 472, 473, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 503, 504, 505, 506, 507, 508, 509, 512, 513, 515, 516, 518, 519, 520, 521, 522, 523, 524, 545, 546, 547, 556, 557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 572, 573, 574, 575, 576, 577, 578, 579, 582, 583, 584, 587, 604, 605, 606, 607, 608, 609, 610, 611, 612, 613, 614, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 691, 692, 693, 694, 695, 696, 697, 698, 699, 701, 705, 707, 709, 711, 713, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 750, 760, 761, 764, 765, 766, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 802, 841, 842, 843, 844, 845, 846, 847, 848, 849, 850, 851, 852, 853, 854, 855, 856, 857, 858, 859, 860, 861, 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872, 875, 876, 877, 878, 879, 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892, 893, 894, 896, 897, 898, 899, 900, 902, 903, 905, 906, 907, 908, 910, 911, 912, 913, 914, 915, 937, 938, 939, 940, 941, 942, 944, 945, 946, 947, 948, 949, 950, 951, 952, 953, 955, 956, 957, 958, 959, 960, 961, 962, 963, 964, 966, 969, 970, 972, 973, 974, 975, 976, 977, 978, 979, 980, 981, 1007, 1008, 1009, 1010, 1012, 1014, 1015, 1017, 1020, 1021, 1022, 1023, 1024, 1028, 1029, 1030, 1034, 1035, 1038, 1040, 1145, 1151, 1153, 1157, 1159, 1160, 1161, 1162, 1165, 1166, 1167, 1169, 1171, 1172, 1174, 1176, 1177, 1178, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1205, 1206, 1225, 1243, 1244, 1248, 1250, 1254, 1255, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1275, 1276, 1277, 1279, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1291, 1292, 1293, 1295, 1296, 1297, 1307, 1308, 1309, 1310, 1311, 1312, 1396, 1400, 1402, 1404, 1405, 1406, 1407, 1408, 1409, 1410, 1411, 1412, 1413, 1414, 1415, 1416, 1417, 1418, 1419, 1420, 1421, 1422, 1423, 1424, 1425, 1426, 1427, 1428, 1436, 1457, 1463, 1516, 1517, 1552, 1556, 1557, 1558, 1559, 1560, 1561, 1563, 1576, 1596, 1636, 1637, 1638, 1656, 1658, 1676, 1678, 1681, 1684, 1686, 1687, 1688, 1689, 1690, 1692, 1694, 1695, 1696, 1697, 1699, 1700, 1701, 1702, 1703, 1704, 1705, 1706, 1707, 1717, 1718, 1721, 1722, 1723, 1727, 1737, 1751, 1752, 1755, 1757, 1761, 1762, 1763, 1764, 1765, 1766, 1777, 1778, 1779, 1780, 1781, 1782, 1785, 1786, 1788, 1789, 1790, 1791, 1792, 1793, 1795, 1796, 1797, 1798, 1799, 1800, 1801, 1816, 1817, 1832, 1833, 1834, 1836, 1837, 1856, 1857, 1858, 1859, 1860, 1862, 1864, 1865, 1866, 1867, 1868, 1869, 1870, 1871, 1872, 1873, 1874, 1875, 1876, 1877, 1919, 1936, 1956, 1957, 1958, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2016, 2018, 2019, 2036, 2037, 2038, 2039, 2040, 2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050, 2051, 2052, 2053, 2054, 2056, 2057, 2058, 2076, 2077, 2078, 2079, 2080, 2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090, 2091, 2092, 2093, 2094, 2095, 2096, 2097, 2116, 2136, 2137, 2138, 2139, 2140, 2141, 2142, 2143, 2144, 2146, 2147, 2148, 2149, 2150, 2151, 2152, 2153, 2154, 2155, 2156, 2157, 2176, 2177, 2178, 2179, 2180, 2181, 2182, 2183, 2184, 2185, 2186, 2187, 2188, 2189, 2190, 2191, 2193, 2194, 2199, 2256, 2257, 2316, 2336, 2357, 2358, 2359, 2398, 2416, 2417, 2418, 2419, 2421, 2422, 2436, 2456, 2496, 2516, 2536, 2556, 2557, 2576, 2676, 2716, 2756, 2758, 2760, 2761, 2762, 2763, 2764, 2770, 2772, 2773, 2777, 2778, 2779, 2780, 2781, 2782, 2796, 2797, 2817, 2836, 2886, 2887, 2888, 2889, 2890, 2891, 2892, 2893, 2894, 2895, 2903, 2904, 2905, 2906, 2907, 2908, 2909, 2910, 2911, 2912, 2913, 2914, 2915, 2916, 2917, 2918, 2919, 2921, 2923, 2924, 2925, 2926, 2927, 2928, 2929, 2930, 2931, 2932, 2933, 2934, 2935, 2936, 2937, 2938, 2939, 2940, 2941, 2942, 2943, 2944, 2945, 2946, 2947, 2948, 2951, 2952, 2953, 2954, 2955, 2956, 2957, 2958, 2959, 2960, 2961, 2962, 2963, 2965, 2967, 2968, 2969, 2970, 2971, 2972, 2973, 2974, 2975, 2976, 2977, 2978, 2979, 2980, 2981, 2982, 2983, 2984, 2985, 2989, 2995, 2996, 2997, 3002, 3003, 3004, 3005, 3006, 3007, 3008, 3009, 3010, 3011, 3012, 3013, 3014, 3015, 3016, 3017, 3036, 3037, 3056, 3057, 3058, 3059, 3076, 3077, 3096, 3097, 3098, 3117, 3118, 3136, 3137, 3138, 3141, 3142, 3157, 3158, 3159, 3161, 3162, 3163, 3164, 3176, 3177, 3178, 3179, 3180, 3181, 3182, 3183, 3184, 3185, 3186, 3187, 3188, 3189, 3217, 3218, 3237, 3259, 3296, 3316, 3336, 3356, 3436, 3456, 3457, 3478, 3496, 3536, 3556, 3558, 3559, 3576, 3578, 3579, 3580, 3582, 3596, 3618, 3636, 3676, 3736, 3756, 3757, 3758, 3776, 3777, 3797, 3798, 3799, 3800, 3802, 3803, 3804, 3808, 3809, 3810, 3812, 3813, 3814, 3815, 3816, 3817, 3818, 3819, 3836, 3837, 3838, 3839, 3840, 3841, 3842, 3843, 3844, 3845, 3846, 3847, 3848, 3849, 3850, 3851, 3852, 3853, 3854, 3855, 3856, 3857, 3876, 3896, 3916, 3917, 3918, 3936, 3937, 3996, 3997, 4016, 4017, 4078, 4080, 4156, 4296, 4298, 4316, 4396, 4397, 4400, 4402, 4403, 4404, 4405, 4406, 4407, 4436, 4476, 4477, 4478, 4496, 4516, 4517, 4518, 4519, 4520, 4521, 4522, 4523, 4524, 4525, 4526, 4527, 4528, 4529, 4530, 4531, 4532, 4534, 4535, 4536, 4537, 4538, 4539, 4576, 4577, 4578, 4579, 4580, 4581, 4582, 4583, 4584, 4585, 4586, 4596, 4597, 4598, 4599, 4600, 4601, 4602, 4603, 4604, 4605, 4606, 4607, 4608, 4610, 4611, 4612, 4613, 4614, 4615, 4616, 4617, 4618, 4619, 4620, 4621, 4622, 4623, 4624, 4625, 4626, 4627, 4628, 4629, 4630, 4631, 4632, 4633, 4634, 4635, 4636, 4637, 4782, 4784, 4786, 4815, 4816, 4817, 4818, 4824, 15018, 15019, 15020, 15021, 15022, 15198, 15199, 15200, 15201, 15202, 15203, 15204, 15205, 15206, 15207, 15208, 15209, 15210, 15330, 15332, 15333, 15334, 15335, 15637, 15853, 16313, 16314, 16315, 16316, 16332, 16397, 16433, 16437]

const b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
const b64remap: { [id: string]: number } = {}
for (let i = 0; i < b64chars.length; i++) {
    b64remap[b64chars.charAt(i)] = i;
}

const parseBinaryData01 = (text: string): PlayerAchievementData[] => {
    const result: PlayerAchievementData[] = []
    let bad
    if (text.length % 2) {
        return result
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + text.length)
        bad = true
//        throw 'Invalid binary data'
    }
    let achievementIndex = 0
    for (let i = 0; i < text.length; i += 2) {
        let higherBit = b64remap[text[i]]
        const lowerBit = b64remap[text[i + 1]]
        const done = (higherBit & 32) != 0
        higherBit &= 31
        const number = higherBit * 64 + lowerBit
        if (done) {
            const achievementId = ACHIEVEMENT_IDS_01[achievementIndex]
            result.push({
                achievementId,
                date: number
            })
            if (bad)
                console.log('done', achievementId, number)
            achievementIndex++
        } else {
            achievementIndex += number
            if (bad)
                console.log('skip', number)
        }
    }

    return result
}

const decode01 = (text: string): AddonExportData => {
    const fields: ['name', 'race', 'class', 'time', 'data'] = ['name', 'race', 'class', 'time', 'data']
    const entries = text.split(';')

    const playersData: AddonPlayerData[] = []

    const realm = entries[2]
    const guild = entries[3]

    let playerInfo: Partial<AddonPlayerData> = {}
    for (let i = 4; i < entries.length; i++) {
        const fieldName = fields[(i - 4) % fields.length]
        const field = entries[i]
        console.log(i, fieldName, field)
        switch (fieldName) {
            case 'name':
                playerInfo = {name: field}
                break
            case 'race':
                playerInfo.race = field
                break
            case 'class':
                playerInfo.class = field
                break
            case 'time':
                const parsed = Number.parseInt(field)
                if (isNaN(parsed)) {
                    throw `Invalid time format: ${field}`
                }
                playerInfo.time = new Date(1000 * parsed)
                break
            case 'data':
                playerInfo.achievements = parseBinaryData01(field)
                playersData.push(playerInfo as AddonPlayerData)
                break
        }
    }

    return {guild, realm, playersData}
}

export const decodeAddonData = (text: string): AddonExportData => {
    const [header, protocolVersion, ..._] = text.slice(0, 20).split(';')
    if (header !== 'cat') {
        throw 'Unknown format'
    }
    if (protocolVersion === '0.1') {
        return decode01(text)
    }

    throw `Unsupported protocol ${protocolVersion}`
}
