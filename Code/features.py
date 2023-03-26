

FEATURES = ['NUM_PREV_TX',
            'A1', 'A2', 'B1', 'B2', 'DR1', 'DR2', 'BW4', 'BW6', 'C1', 'C2', 'DR51', 'DR51_2', 'DR52',
            'DR52_2', 'DR53', 'DR53_2', 'DQ1', 'DQ2', 'DA1', 'DA2', 'DB1', 'DB2', 'DDR1', 'DDR2', 'RA1',
            'RA2', 'RB1', 'RB2', 'RDR1', 'RDR2',
            'GENDER',
            'ABO',
            'WGT_KG_TCR',
            'HGT_CM_TCR',
            'BMI_TCR',
            'INIT_AGE',
            'ON_DIALYSIS',
            'INIT_CURRENT_PRA',
            'INIT_PEAK_PRA',
            'PREV_TX',
            'AMIS', 'BMIS', 'DRMIS', 'HLAMIS',  # missmatch levels
            "NPKID",  # number of previous transplants
            "AGE_DON",
            "CMV_DON",
            #  "COD_KI",  # rec. cause of death,
            "HBV_CORE_DON",
            'COD_CAD_DON',
            "DEATH_CIRCUM_DON",
            "DIAB",  # recipient diabetes
            "DEATH_MECH_DON",  # diseased donor cause of death
            "ABO_DON", "ABO_MAT",
            "DON_TY",  # diseased or living donor
            "NON_HRT_DON",
            'GENDER_DON',
            "CREAT_DON",
            "HIST_CIG_DON",
            "DIABETES_DON",
            "HGT_CM_DON_CALC",
            "WGT_KG_DON_CALC",
            "BMI_DON_CALC",
            "KDPI", "KDRI_MED", 'KDRI_RAO',  # important index of compatibility
            "AGE",
            "DIAL_TRR",
            "DIAG_KI",  # recipient diagnosis
            "COLD_ISCH_KI",
            "WARM_ISCH_TM_DON",
            #  "GRF_FAIL_CAUSE_TY_KI",  # graft fail cause
            "DWFG_KI",  # recipient died with functioning graft
                        #  "GTIME_KI",  # graft lifespan
                        "PTIME",
                        #  "GSTATUS_KI",  # graft failed
            "CMV_IGG", "CMV_IGM", "CMV_STATUS",
            "PREV_TX_ANY",
            "MED_COND_TRR",  # recipient med. condition pretransplant
            "PX_STAT",  # rec status
            "AGE_GROUP",
            "MALIG",
            "BMI_CALC",
            "TATTOOS",
            "EDUCATION",
            # treated for rejection within one year
                        #   "MALIG_TCR_KI", # tumor
            "TRTREJ1Y_KI"  # treated for rejection within one year
            ]

NEW_FEATURES = [
    "AGE",
    'GENDER',
    "DIAG_KI",
    'ON_DIALYSIS',
    "ABO",
    'AMIS', 'BMIS', 'DRMIS', 'HLAMIS'

    "DON_TY",
    "CMV_IGG", "CMV_IGM", "CMV_STATUS",
    "DIABETES_DON",
    "CREAT_DON",


    # gender matching: male/male, male/female, female/male, or female/female #TODO: feature engeneerinng
    "PRE_TX_TXFUS", # pretransplant transfusions
    'GENDER_DON',
    "ABO_DON",
    "COLD_ISCH_KI",
    "WARM_ISCH_TM_DON",
    'A1', 'A2', 'B1', 'B2', 'DR1', 'DR2', 'BW4', 'BW6', 'C1', 'C2', 'DR51', 'DR51_2', 'DR52',
    'DR52_2', 'DR53', 'DR53_2', 'DQ1', 'DQ2', 'DA1', 'DA2', 'DB1', 'DB2', 'DDR1', 'DDR2', 'RA1',
    'RA2', 'RB1', 'RB2', 'RDR1', 'RDR2',
]
