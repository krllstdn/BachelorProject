
COLUMNS = [
    "PTIME", # Target
    "PSTATUS", # most recent patient status (1-dead,0-alive)
    
    "GTIME_KI", # graft survival
    "GSTATUS_KI", # graft failed  (1 - yes)
    
    # Recipient info
    "AGE",
    'AGE_GROUP',
    'GENDER',
    "ABO",
    "DIAG_KI",
    'ON_DIALYSIS',
    "BMI_CALC",
    "WGT_KG_CALC", # weight
    "HGT_CM_CALC", #"INIT_HGT_CM", # height
    "NPKID", # num of tx
    "CREAT_TRR", # recipient, creatinine at the time of tx
    
    # look for a column where it is told if patient died from graft unrelated reasons: COD_KI

    # columns to consider: HBV_CORE,HBV_SUR_ANTIGEN_DON, HBV_CORE_DON,HBV_DNA_DON, DIAB, HAPLO_TY_MATCH_DON, CMV_OLD_LIV_DON, CMV_NUCLEIC_DON, CMV_TEST_DON, ETHCAT, ETHCAT_DON, ETHNICITY, GFR, 
    # HCV_RIBA_DON
    # HCV_RNA_DON
    # HCV_SEROSTATUS
    # HCV_TEST_DON
    # HEP_C_ANTI_DON
    # HEPARIN_DON
    # 2007: END_CPRA,END_CPRA_DETAIL
    # GRF_FAIL_CAUSE_TY_KI
    # Donor info
    "AGE_DON",
    'GENDER_DON',
    "ABO_DON",
    "DON_TY",
    "BMI_DON_CALC",
    "WGT_KG_DON_CALC",
    "HGT_CM_DON_CALC",
    "DIABETES_DON",

    "ABO_MAT",

    "PRE_TX_TXFUS", # pretransplant transfusions
    'A1', 'A2',
    'B1', 'B2', 
    'DR1', 'DR2', 

    'BW4', 'BW6', 'C1', 'C2', 'DR51', 'DR51_2', 'DR52',
    'DR52_2', 'DR53', 'DR53_2', 'DQ1', 'DQ2', 
    ]


# KDPI
# KDRI_MED - median kdpi - create a feature "difference from median"
# KDRI_RAO



# deceased donor columns to consider: 
# CONTIN_ALCOHOL_OLD_DON
# CONTIN_CIG_DON
# CONTIN_COCAINE_DON
# CONTIN_IV_DRUG_OLD_DON
# CONTIN_OTH_DRUG_DON
# CONTROLLED_DON
# CORE_COOL_DON
# DIET_DON
# HIST_ALCOHOL_OLD_DON
# HIST_CANCER_DON
# HIST_CIG_DON
# HIST_COCAINE_DON
# HIST_DIABETES_DON
# HIST_HYPERTENS_DON
# HIST_INSULIN_DEP_DON
# HIST_IV_DRUG_OLD_DON
# HIST_OTH_DRUG_DON