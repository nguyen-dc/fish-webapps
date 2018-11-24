export enum SystemIDEnum {
    /**loại phiếu nhập: nhập hàng hóa */
    ImportStock_TypeDefault = 2,
    /**loại phiếu xuất: xuất hàng hóa */
    ExportStock_TypeDefault = 1,

    /**loại phiếu nhập: nhập thả cá */
    ReleaseLiveStock_ReceiveType = 4,
    /**Loại chi phí: nhập thả cá */
    ReleaseLiveStock_ExpenditureType = 2,
    /**Loại phiếu xuất: nhập thả cá */
    ReleaseLiveStock_IssueType = 6,

    /**Loại phiếu xuất: xuất chuyển nội bộ (cho ăn/uống thuốc/chuyển kho) */
    FeedingLivestock_IssueType = 4,
    /**Ngành hàng giống nuôi */
    ProductGroup_LivestockSeed = 1,
    ProductGroup_Food = 2,
    ProductGroup_Medicine = 3,
    /**
     * Lịch sử đợt nuôi: 
     * Action thả cá (nhập con giống)
     */
    FarmingSeason_ActionType_Release = 1,
    /**
     * Lịch sử đợt nuôi: 
     * Action xuất cá (xuất con giống)
     */
    FarmingSeason_ActionType_Export = 2,
    /**
     * Lịch sử đợt nuôi: 
     * Action Cho ăn
     */
    FarmingSeason_ActionType_Feed = 3,
    /**
     * Lịch sử đợt nuôi: 
     * Action Rải thuốc
     */
    FarmingSeason_ActionType_Medicine = 4,
    /**
     * Lịch sử đợt nuôi: 
     * Action cân trọng
     */
    FarmingSeason_ActionType_FCR = 5,
}