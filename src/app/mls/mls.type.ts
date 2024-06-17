export interface MlsAPIResponse {
  '@odata.context': string;
  value: Value[];
  '@odata.nextLink': string;
}

export type PropertyStatus = 'Active' | 'Pending' | 'Under Contract' | 'Sold';

export enum ListingOrder {
  HIGHEST_PRICE = 1,
  LOWEST_PRICE = 2,
  NEWEST = 3,
  OLDEST = 4,
  SQUARE_FEET = 5,
}

export interface Value {
  '@odata.id': string;
  AdditionalParcelsYN?: boolean;
  MFR_AssociationFeeRequirement?: MFRAssociationFeeRequirement;
  AssociationYN?: boolean;
  BathroomsTotalInteger: number;
  BuyerAgencyCompensation?: string;
  MFR_CalculatedListPriceByCalculatedSqFt?: string;
  City: string;
  Concessions?: Concessions;
  Country?: Country;
  CountyOrParish: CountyOrParish;
  CumulativeDaysOnMarket: number;
  MFR_CurrentPrice: string;
  CurrentUse?: CurrentUse[];
  DaysOnMarket: number;
  Directions?: string;
  DualVariableCompensationYN?: boolean;
  ExpirationDate: Date;
  MFR_FloodZoneCode?: string;
  MFR_FloodZoneDate?: Date;
  MFR_FloodZonePanel?: string;
  MFR_ForLeaseYN?: string;
  MFR_FrontFootage?: string;
  HomeWarrantyYN?: boolean;
  InternetAddressDisplayYN: boolean;
  InternetEntireListingDisplayYN: boolean;
  Latitude?: number;
  ListAgentAOR: TAor;
  ListAgentDirectPhone?: string;
  ListAgentEmail: string;
  ListAgentFax?: string;
  ListAgentFullName: string;
  ListAgentKey: string;
  ListAgentMlsId: string;
  ListAgentOfficePhoneExt?: string;
  ListAgentPager?: string;
  ListAOR: TAor;
  ListingAgreement?: ListingAgreement;
  ListingContractDate: string;
  ListingId: string;
  ListingKey: string;
  OriginatingSystemKey: string;
  ListingService?: ListingService;
  ListOfficeFax?: string;
  MFR_ListOfficeHeadOfficeKeyNumeric: string;
  ListOfficeKey: string;
  ListOfficeMlsId: string;
  ListOfficeName: string;
  ListOfficePhone: string;
  ListPrice?: number;
  Longitude?: number;
  LotFeatures?: string[];
  LotSizeAcres?: number;
  LotSizeDimensions?: string;
  LotSizeSquareFeet?: number;
  MajorChangeTimestamp: Date;
  MajorChangeType?: MajorChangeType;
  MFR_MillageRate?: string;
  MLSAreaMajor: string;
  MFR_MlsMajorChangeType?: MfrMlsMajorChangeType;
  MlsStatus: MfrMlsMajorChangeType;
  MFR_NonRepCompensation?: string;
  OffMarketDate?: Date;
  OriginalEntryTimestamp: Date;
  OriginalListPrice?: number;
  OriginatingSystemName: OriginatingSystemName;
  Ownership?: Ownership;
  ParcelNumber: string;
  PhotosChangeTimestamp: Date;
  PhotosCount: number;
  PostalCode: string;
  MFR_PreviousStatus?: MfrMlsMajorChangeType;
  MFR_PricePerAcre?: string;
  PropertySubType?: PropertySubType;
  PropertyType: PropertyType;
  PublicRemarks: string;
  PublicSurveyRange?: string;
  PublicSurveySection?: string;
  MFR_RATIO_CurrentPrice_By_CalculatedSqFt?: string;
  ShowingRequirements?: ShowingRequirement[];
  SpecialListingConditions?: SpecialListingCondition[];
  StandardStatus: MajorChangeType;
  StateOrProvince: MfrEscrowState;
  StatusChangeTimestamp: Date;
  MFR_StatusContractualSearchDate: Date;
  StreetName: string;
  StreetNumber?: string;
  StreetNumberNumeric?: number;
  StreetSuffix?: StreetSuffix;
  SubdivisionName?: string;
  SyndicateTo?: SyndicateTo[];
  TaxAnnualAmount?: number;
  TaxBlock?: string;
  TaxBookNumber?: string;
  TaxLegalDescription?: string;
  TaxLot?: string;
  TaxYear?: number;
  MFR_ThirdPartyYN?: string;
  MFR_TotalAcreage?: MFRTotalAcreage;
  Township?: string;
  TransactionBrokerCompensation?: string;
  UnparsedAddress: string;
  Utilities?: Utility[];
  MFR_WaterAccessYN: string;
  MFR_WaterExtrasYN: string;
  MFR_WaterfrontFeetTotal?: string;
  WaterfrontYN: boolean;
  WaterSource?: WaterSource[];
  MFR_WaterViewYN: string;
  Zoning?: string;
  MFR_PublicRemarksAgent: string;
  MFR_SDEOYN: string;
  ModificationTimestamp: Date;
  Media?: Media[];
  MlgCanView: boolean;
  MlgCanUse: MlgCanUse[];
  MFR_ApplicationFee?: string;
  MFR_AssociationApprovalRequiredYN?: string;
  AssociationName?: string;
  AttachedGarageYN?: boolean;
  AvailabilityDate?: Date;
  BathroomsFull?: number;
  BathroomsHalf?: number;
  BedroomsTotal?: number;
  BuildingAreaTotal?: number;
  BuildingAreaUnits?: AreaUnits;
  MFR_CallCenterPhoneNumber?: string;
  CommunityFeatures?: string[];
  Cooling?: Cooling[];
  ElementarySchool?: string;
  Flooring?: Flooring[];
  Furnished?: Furnished;
  GarageSpaces?: number;
  GarageYN?: boolean;
  Heating?: Heating[];
  HighSchool?: string;
  InteriorFeatures?: string[];
  InternetAutomatedValuationDisplayYN?: boolean;
  InternetConsumerCommentYN?: boolean;
  LeaseAmountFrequency?: LeaseAmountFrequency;
  MFR_LeaseFee?: string;
  MFR_LeaseReferralFeeComments?: string;
  Levels?: Level[];
  LivingArea?: number;
  LivingAreaUnits?: AreaUnits;
  MFR_LongTermYN?: string;
  MiddleOrJuniorSchool?: string;
  NewConstructionYN?: boolean;
  MFR_OffSeasonRent?: string;
  OwnerPays?: OwnerPay[];
  PetsAllowed?: Concessions[];
  PoolFeatures?: Feature[];
  PoolPrivateYN?: boolean;
  PostalCodePlus4?: string;
  PreviousListPrice?: number;
  PriceChangeTimestamp?: Date;
  PrivateRemarks?: string;
  MFR_PropertyDescription?: string;
  MFR_ReferralFee?: MFRReferralFee;
  MFR_RoomCount?: string;
  MFR_SeasonalRent?: string;
  SeniorCommunityYN?: boolean;
  StreetDirSuffix?: string;
  MFR_UnitNumberYN?: string;
  View?: View[];
  VirtualTourURLUnbranded?: string;
  MFR_WaterView?: string;
  YearBuilt?: number;
  Rooms?: Room[];
  MFR_AdditionalRooms?: string;
  Appliances?: Appliance[];
  AssociationAmenities?: string[];
  MFR_AssociationApprovalFee?: string;
  AssociationFeeIncludes?: AssociationFeeInclude[];
  CarportSpaces?: number;
  CarportYN?: boolean;
  MFR_ComTransactionTerms?: MFRCOMTransactionTerms;
  ExteriorFeatures?: string[];
  FireplaceYN?: boolean;
  LeaseTerm?: LeaseTerm;
  ListAgentURL?: string;
  MFR_MasterBedSize?: MFRMasterBedSize;
  MFR_MinimumLease?: MFRMinimumLease;
  MFR_MonthsAvailable?: string;
  ParkingFeatures?: string[];
  MFR_SecurityDeposit?: string;
  SpaYN?: boolean;
  MFR_SWSubdivCommunityName?: string;
  MFR_TempOffMarketDate?: Date;
  TenantPays?: TenantPay[];
  MFR_TermsOfLease?: string;
  UnitNumber?: string;
  MFR_WaterAccess?: string;
  WaterBodyName?: string;
  MFR_WaterFrontageFeetGulfOcean?: string;
  WaterfrontFeatures?: string[];
  WindowFeatures?: WindowFeature[];
  DirectionFaces?: DirectionFaces;
  Disclosures?: Disclosure[];
  ListingTerms?: ListingTerm[];
  MFR_RealtorInfo?: string;
  MFR_Representation?: MFRRepresentation;
  ShowingInstructions?: string;
  MFR_ShowingTime?: MFRShowingTime;
  MFR_WaterFrontageFeetBeachPrvt?: string;
  MFR_WaterFrontageFeetBeachPub?: string;
  MFR_LotSizeSquareMeters?: string;
  CoListAgentDirectPhone?: string;
  CoListAgentEmail?: string;
  CoListAgentFullName?: string;
  CoListAgentKey?: string;
  CoListAgentMlsId?: string;
  CoListOfficeKey?: string;
  CoListOfficeMlsId?: string;
  CoListOfficeName?: string;
  CoListOfficePhone?: string;
  ListOfficeURL?: string;
  NumberOfLots?: number;
  Sewer?: Sewer[];
  Vegetation?: Vegetation[];
  MFR_WaterFrontageFeetPond?: string;
  MFR_CurrentAdjacentUse?: string;
  MFR_AdditionalLeaseRestrictions?: string;
  MFR_ApprovalProcess?: string;
  ArchitecturalStyle?: string[];
  AssociationFeeFrequency?: AssociationFeeFrequency;
  MFR_AvailableForLeaseYN?: string;
  MFR_BonusAmount?: string;
  MFR_BonusExpirationDate?: Date;
  MFR_BonusYN?: string;
  MFR_BuilderLicenseNumber?: string;
  BuilderName?: string;
  BuildingAreaSource?: ASource;
  MFR_BuildingElevatorYN?: string;
  MFR_BuildingNameNumber?: string;
  MFR_CDDYN?: string;
  MFR_ConditionExpDate?: Date;
  MFR_CondoFees?: string;
  MFR_CondoFeesTerm?: AssociationFeeFrequency;
  MFR_CondoLandIncludedYN?: string;
  ConstructionMaterials?: ConstructionMaterial[];
  MFR_DPRURL?: string;
  MFR_DPRURL2?: string;
  MFR_DPRYN?: string;
  MFR_FloorNumber?: string;
  FoundationDetails?: FoundationDetail[];
  MFR_HomesteadYN?: string;
  MFR_LeaseRestrictionsYN?: string;
  LivingAreaSource?: ASource;
  MFR_MaxPetWeight?: string;
  MFR_MonthlyCondoFeeAmount?: string;
  MFR_MontlyMaintAmtAdditionToHOA?: string;
  MFR_NumberOfPets?: string;
  NumberOfUnitsTotal?: number;
  MFR_NumTimesperYear?: string;
  PatioAndPorchFeatures?: PatioAndPorchFeature[];
  MFR_PetRestrictions?: string;
  MFR_PetSize?: MFRPetSize;
  MFR_ProjectedCompletionDate?: Date;
  PropertyCondition?: PropertyCondition[];
  MFR_RealtorInfoConfidential?: MFRRealtorInfoConfidential;
  Roof?: Roof[];
  SecurityFeatures?: string[];
  SpaFeatures?: Feature[];
  StoriesTotal?: number;
  VirtualTourURLBranded?: string;
  WithdrawnDate?: Date;
  MFR_YrsOfOwnerPriorToLeasingReqYN?: string;
  MFR_TotalAnnualFees?: string;
  MFR_TotalMonthlyFees?: string;
  MFR_OtherExemptionsYN?: string;
  MFR_PlannedUnitDevelopmentYN?: string;
  MFR_SubdivisionNum?: string;
  MFR_ZoningCompatibleYN?: string;
  MFR_BackupsRequestedYN?: string;
  BuyerAgentAOR?: TAor;
  BuyerAgentDirectPhone?: string;
  BuyerAgentFullName?: string;
  BuyerAgentKey?: string;
  BuyerAgentMlsId?: string;
  BuyerFinancing?: BuyerFinancing[];
  BuyerOfficeKey?: string;
  BuyerOfficeMlsId?: string;
  BuyerOfficeName?: string;
  BuyerOfficePhone?: string;
  CloseDate?: Date;
  ClosePrice?: number;
  MFR_ClosePriceByCalculatedListPriceRatio?: string;
  MFR_ClosePriceByCalculatedSqFt?: string;
  ConcessionsAmount?: number;
  MFR_ContractStatus?: MFRContractStatus;
  MFR_DaysToClosed?: string;
  MFR_DaystoContract?: string;
  MFR_ExpectedClosingDate?: Date;
  PurchaseContractDate?: Date;
  MFR_RATIO_ClosePrice_By_ListPrice?: string;
  MFR_RATIO_ClosePrice_By_OriginalListPrice?: string;
  MFR_SubdivisionSectionNumber?: string;
  MFR_RoadFrontageFt?: string;
  RoadFrontageType?: string[];
  MFR_PetFeeNonRefundable?: string;
  MFR_AlternateKeyFolioNum?: string;
  FireplaceFeatures?: string[];
  MFR_FutureLandUse?: string;
  OtherStructures?: string[];
  MFR_AdditionalMembershipAvailableYN?: string;
  MFR_ExistLseTenantYN?: string;
  MFR_SWSubdivCondoNum?: string;
  OccupantType?: OccupantType;
  AssociationFee?: number;
  LaundryFeatures?: LaundryFeature[];
  MFR_MonthlyHOAAmount?: string;
  MFR_AuctionPropAccessYN?: string;
  MFR_LastMonthsRent?: string;
  MFR_OtherFeesDescription?: string;
  MFR_LivingAreaMeters?: string;
  StreetDirPrefix?: StreetDirPrefix;
  MFR_AmenitiesAdditionalFees?: string;
  TaxOtherAnnualAssessmentAmount?: number;
  AssociationPhone?: string;
  MFR_WaterFrontageFeetCanalBrackish?: string;
  MFR_AssociationEmail?: string;
  BusinessType?: string[];
  MFR_ComTransactionType?: MFRCOMTransactionType;
  LeasableArea?: number;
  LeasableAreaUnits?: AreaUnits;
  NetOperatingIncome?: number;
  MFR_TotalNumBuildings?: string;
  BusinessName?: string;
  YearEstablished?: number;
  MFR_WaterFrontageFeetLake?: string;
  MFR_AdditionalApplicantFee?: string;
  MFR_WaterExtras?: string;
  GreenEnergyEfficient?: string[];
  GreenWaterConservation?: string[];
  MFR_Easements?: string;
  Fencing?: string[];
  MFR_AnnualRent?: string;
  ListTeamName?: string;
  MFR_WeeksAvailable?: string;
  MFR_WaterFrontageFeetCanalSalt?: string;
  MFR_CountyLandUseCode?: string;
  MFR_CountyPropertyUseCode?: string;
  MFR_StateLandUseCode?: string;
  MFR_StatePropertyUseCode?: string;
  MFR_ComplexCommunityNameNCCB?: string;
  MFR_GarageDimensions?: string;
  MFR_GreenLandscaping?: string;
  MFR_NumOfOwnYearsPriorToLse?: string;
  MFR_AdjoiningProperty?: string;
  MFR_CeilingHeight?: string;
  MFR_ConvertedResidenceYN?: string;
  MFR_PropertyManager?: string;
  MFR_PropertyManagerPhone?: string;
  MFR_TransportationAccess?: string;
  MFR_UseCode?: string;
  MFR_VirtualTourURLUnbranded2?: string;
  PropertyAttachedYN?: boolean;
  MFR_PetDepositFee?: string;
  MFR_WaterFrontageFeetICW?: string;
  GreenBuildingVerificationType?: string[];
  MFR_GreenVerificationCount?: string;
  MFR_AffidavitYN?: string;
  MFR_ExpireRenewalDate?: Date;
  MFR_FCHRURLYN?: string;
  Model?: string;
  MFR_CeilingType?: string;
  MFR_CondoEnvironmentYN?: string;
  MFR_LeasePrice?: string;
  MFR_NumofConferenceMeetingRooms?: string;
  MFR_DisasterMitigation?: string;
  AdditionalParcelsDescription?: string;
  MFR_LastDateAvailable?: Date;
  MFR_WaterFrontageFeetRiver?: string;
  MFR_OfficeRetailSpaceSqFt?: string;
  MFR_AssociationURL?: string;
  MFR_BuildingAreaTotalSrchSqM?: string;
  MFR_CurrencyMonthlyRentAmt?: string;
  MFR_DaysNoticeToTenantIfNotRenew?: string;
  MFR_MonthToMonthOrWeeklyYN?: string;
  MFR_EscrowState?: MfrEscrowState;
  AccessibilityFeatures?: string[];
  MFR_AnnualNetIncome?: string;
  BuilderModel?: string;
  MFR_UnitCount?: string;
  UnitTypes?: UnitType[];
  MFR_OtherFeesAmount?: string;
  MFR_OtherFeesTerm?: string;
  GreenIndoorAirQuality?: string[];
  MFR_AdditionalWaterInformation?: string;
  RoadSurfaceType?: string[];
  MFR_NumberOfSeptics?: string;
  MFR_EscrowAgentEmail?: string;
  MFR_EscrowAgentName?: string;
  MFR_EscrowAgentPhone?: string;
  MFR_EscrowCity?: string;
  MFR_EscrowCompany?: string;
  MFR_EscrowPostalCode?: string;
  MFR_EscrowStreetName?: string;
  MFR_EscrowStreetNumber?: string;
  MFR_VirtualTourURLBranded2?: string;
  MFR_WaterFrontageFeetBayHarbor?: string;
  MFR_PublicRemarksAgentSpanish?: string;
  PrivateOfficeRemarks?: string;
  BodyType?: string[];
  GrossIncome?: number;
  MFR_SoldRemarks?: string;
  FinancialDataSource?: ASource[];
  TotalActualRent?: number;
  MFR_ExpectedLeaseDate?: Date;
  MFR_DoorHeight?: string;
  MFR_DoorWidth?: string;
  Electric?: string[];
  MFR_GarageDoorHeight?: string;
  MFR_NumofBaysGradeLevel?: string;
  MFR_NumofOffices?: string;
  MFR_NumofRestrooms?: string;
  BuildingFeatures?: string[];
  MFR_AuctionType?: string;
  MFR_PermitNumber?: string;
  MFR_WaterFrontageFeetLakeChain?: string;
  MFR_BuyersPremium?: string;
  MFR_WaterFrontageFeetCreek?: string;
  MFR_FinancingTerms?: string;
  OtherEquipment?: string[];
  MFR_LeasePricePerAcre?: string;
  MFR_BOMDate?: Date;
  CoBuyerAgentDirectPhone?: string;
  CoBuyerAgentEmail?: string;
  CoBuyerAgentFullName?: string;
  CoBuyerAgentKey?: string;
  CoBuyerAgentMlsId?: string;
  CoBuyerOfficeKey?: string;
  CoBuyerOfficeMlsId?: string;
  CoBuyerOfficeName?: string;
  CoBuyerOfficePhone?: string;
  MFR_ComplexDevelopmentName?: string;
  MFR_EscrowAgentFax?: MFREscrowAgentFax;
  MFR_WaterFrontageFeetCanalFresh?: string;
  MFR_BusinessOpportunityWithRealEstateYN?: string;
  MFR_DepositsYN?: string;
  MFR_AdditionalPetFees?: string;
  MFR_PoolDimensions?: string;
  MFR_WeeklyRent?: string;
  MFR_FlexSpaceSqFt?: string;
  MFR_FreezerSpaceYN?: string;
  MFR_NumofBaysDockHigh?: string;
  MFR_WaterFrontageFeetMarina?: string;
  MFR_WaterFrontageFeetOcean2Bay?: string;
  MFR_WaterFrontageFeetLagoon?: string;
}

export enum Appliance {
  BarFridge = 'Bar Fridge',
  BuiltInOven = 'Built-In Oven',
  ConvectionOven = 'Convection Oven',
  Cooktop = 'Cooktop',
  Dishwasher = 'Dishwasher',
  Disposal = 'Disposal',
  DoubleOven = 'Double Oven',
  Dryer = 'Dryer',
  ENERGYSTARQualifiedDishwasher = 'ENERGY STAR Qualified Dishwasher',
  ENERGYSTARQualifiedRefrigerator = 'ENERGY STAR Qualified Refrigerator',
  ElectricWaterHeater = 'Electric Water Heater',
  ExhaustFan = 'Exhaust Fan',
  Freezer = 'Freezer',
  GasWaterHeater = 'Gas Water Heater',
  IceMaker = 'Ice Maker',
  Microwave = 'Microwave',
  MicrowaveHood = 'Microwave Hood',
  None = 'None',
  Other = 'Other',
  Oven = 'Oven',
  Range = 'Range',
  RangeHood = 'Range Hood',
  Refrigerator = 'Refrigerator',
  TanklessWaterHeater = 'Tankless Water Heater',
  TrashCompactor = 'Trash Compactor',
  Washer = 'Washer',
  WaterFilterOwned = 'Water Filter Owned',
  WaterFiltrationSystem = 'Water Filtration System',
  WaterSoftener = 'Water Softener',
  WaterSoftenerOwned = 'Water Softener Owned',
  WineRefrigerator = 'Wine Refrigerator',
}

export enum AssociationFeeFrequency {
  Annually = 'Annually',
  Monthly = 'Monthly',
  Quarterly = 'Quarterly',
  SemiAnnually = 'Semi-Annually',
}

export enum AssociationFeeInclude {
  CableTV = 'Cable TV',
  CommonAreaTaxes = 'Common Area Taxes',
  Electricity = 'Electricity',
  EscrowReservesFund = 'Escrow Reserves Fund',
  FidelityBond = 'Fidelity Bond',
  Gas = 'Gas',
  Guard24Hour = 'Guard - 24 Hour',
  Insurance = 'Insurance',
  Internet = 'Internet',
  Maintenance = 'Maintenance',
  MaintenanceGrounds = 'Maintenance Grounds',
  MaintenanceStructure = 'Maintenance Structure',
  Management = 'Management',
  None = 'None',
  Other = 'Other',
  PestControl = 'Pest Control',
  Pool = 'Pool',
  PrivateRoad = 'Private Road',
  RecreationalFacilities = 'Recreational Facilities',
  Security = 'Security',
  Sewer = 'Sewer',
  Trash = 'Trash',
  Water = 'Water',
}

export enum ASource {
  Appraiser = 'Appraiser',
  Builder = 'Builder',
  Estimated = 'Estimated',
  Owner = 'Owner',
  PublicRecords = 'Public Records',
}

export enum AreaUnits {
  SquareFeet = 'Square Feet',
}

export enum TAor {
  CentralPasco = 'Central Pasco',
  EastPasco = 'East Pasco',
  EastPolk = 'East Polk',
  Englewood = 'Englewood',
  ForFutureUse = 'For Future Use',
  LakeAndSumter = 'Lake and Sumter',
  LakeWales = 'Lake Wales',
  Lakeland = 'Lakeland',
  OcalaMarion = 'Ocala - Marion',
  OrlandoRegional = 'Orlando Regional',
  Osceola = 'Osceola',
  Other = 'Other',
  PinellasSuncoast = 'Pinellas Suncoast',
  PortCharlotte = 'Port Charlotte',
  SarasotaManatee = 'Sarasota - Manatee',
  Tampa = 'Tampa',
  Venice = 'Venice',
  WestPasco = 'West Pasco',
  WestVolusia = 'West Volusia',
}

export enum BuyerFinancing {
  Assumed = 'Assumed',
  Cash = 'Cash',
  Conventional = 'Conventional',
  Fha = 'FHA',
  SellerFinancing = 'Seller Financing',
}

export enum Concessions {
  BreedRestrictions = 'Breed Restrictions',
  CatsOK = 'Cats OK',
  DogsOK = 'Dogs OK',
  No = 'No',
  NumberLimit = 'Number Limit',
  PetDeposit = 'Pet Deposit',
  SizeLimit = 'Size Limit',
  Yes = 'Yes',
}

export enum ConstructionMaterial {
  Block = 'Block',
  Brick = 'Brick',
  Combination = 'Combination',
  Concrete = 'Concrete',
  ICFSInsulatedConcreteForms = 'ICFs (Insulated Concrete Forms)',
  Metal = 'Metal',
  MetalFrame = 'Metal Frame',
  MetalSiding = 'Metal Siding',
  Other = 'Other',
  Siding = 'Siding',
  Stone = 'Stone',
  Stucco = 'Stucco',
  VinylSiding = 'Vinyl Siding',
  WoodFrame = 'Wood Frame',
  WoodSiding = 'Wood Siding',
}

export enum Cooling {
  CentralAir = 'Central Air',
  HumidityControl = 'Humidity Control',
  MiniSplitUnitS = 'Mini-Split Unit(s)',
  None = 'None',
  OfficeOnly = 'Office Only',
  WallWindowUnitS = 'Wall/Window Unit(s)',
  Zoned = 'Zoned',
}

export enum Country {
  Us = 'US',
}

export enum CountyOrParish {
  Brevard = 'Brevard',
  Charlotte = 'Charlotte',
  DeSoto = 'DeSoto',
  Hardee = 'Hardee',
  Hernando = 'Hernando',
  Highlands = 'Highlands',
  Hillsborough = 'Hillsborough',
  Lake = 'Lake',
  Lee = 'Lee',
  Manatee = 'Manatee',
  Marion = 'Marion',
  Orange = 'Orange',
  Osceola = 'Osceola',
  Pasco = 'Pasco',
  Pinellas = 'Pinellas',
  Polk = 'Polk',
  Putnam = 'Putnam',
  Sarasota = 'Sarasota',
  Seminole = 'Seminole',
  Sumter = 'Sumter',
  Volusia = 'Volusia',
}

export enum CurrentUse {
  Business = 'Business',
  Commercial = 'Commercial',
  Farm = 'Farm',
  Industrial = 'Industrial',
  MixedUse = 'Mixed Use',
  MobileHome = 'Mobile Home',
  MultiFamily = 'Multi-Family',
  Nursery = 'Nursery',
  Other = 'Other',
  Residential = 'Residential',
  RowCrops = 'Row Crops',
  SingleFamily = 'Single Family',
  Subdivision = 'Subdivision',
}

export enum DirectionFaces {
  East = 'East',
  North = 'North',
  Northeast = 'Northeast',
  Northwest = 'Northwest',
  South = 'South',
  Southeast = 'Southeast',
  Southwest = 'Southwest',
  West = 'West',
}

export enum Disclosure {
  CondominiumDisclosureAvailable = 'Condominium Disclosure Available',
  EnvironmentalDisclosure = 'Environmental Disclosure',
  HOAPUDCondoDisclosure = 'HOA/PUD/Condo Disclosure',
  LandSalesDisclosure = 'Land Sales Disclosure',
  LeadPaint = 'Lead Paint',
  None = 'None',
  OtherDisclosures = 'Other Disclosures',
  SellerPropertyDisclosure = 'Seller Property Disclosure',
}

export enum Flooring {
  Bamboo = 'Bamboo',
  Brick = 'Brick',
  BrickStone = 'Brick/Stone',
  Carpet = 'Carpet',
  CeramicTile = 'Ceramic Tile',
  CeramicTileConcrete = 'Ceramic Tile,Concrete',
  Concrete = 'Concrete',
  EngineeredHardwood = 'Engineered Hardwood',
  Hardwood = 'Hardwood',
  Laminate = 'Laminate',
  LaminateWood = 'Laminate,Wood',
  Linoleum = 'Linoleum',
  Marble = 'Marble',
  Other = 'Other',
  Parquet = 'Parquet',
  PorcelainTile = 'Porcelain Tile',
  QuarryTile = 'Quarry Tile',
  ReclaimedWood = 'Reclaimed Wood',
  Terrazzo = 'Terrazzo',
  Tile = 'Tile',
  Travertine = 'Travertine',
  Vinyl = 'Vinyl',
  Wood = 'Wood',
}

export enum FoundationDetail {
  Basement = 'Basement',
  Crawlspace = 'Crawlspace',
  Slab = 'Slab',
  StemWall = 'Stem Wall',
  StiltOnPiling = 'Stilt/On Piling',
}

export enum Furnished {
  Furnished = 'Furnished',
  Negotiable = 'Negotiable',
  Partially = 'Partially',
  Turnkey = 'Turnkey',
  Unfurnished = 'Unfurnished',
}

export enum Heating {
  Central = 'Central',
  Electric = 'Electric',
  ExhaustFan = 'Exhaust Fan',
  HeatPump = 'Heat Pump',
  NaturalGas = 'Natural Gas',
  None = 'None',
  Other = 'Other',
  Partial = 'Partial',
  Propane = 'Propane',
  WallUnitsWindowUnit = 'Wall Units / Window Unit',
  Zoned = 'Zoned',
}

export enum LaundryFeature {
  CorridorAccess = 'Corridor Access',
  InGarage = 'In Garage',
  InKitchen = 'In Kitchen',
  Inside = 'Inside',
  LaundryCloset = 'Laundry Closet',
  LaundryRoom = 'Laundry Room',
  Other = 'Other',
  Outside = 'Outside',
  UpperLevel = 'Upper Level',
}

export enum LeaseAmountFrequency {
  Annually = 'Annually',
  Monthly = 'Monthly',
  Seasonal = 'Seasonal',
  Weekly = 'Weekly',
}

export enum LeaseTerm {
  MonthToMonth = 'Month To Month',
  ShortTermLease = 'Short Term Lease',
  ThreeToFiveYears = 'Three to Five Years',
  TwelveMonths = 'Twelve Months',
  TwentyFourMonths = 'Twenty Four Months',
}

export enum Level {
  One = 'One',
  ThreeOrMore = 'Three Or More',
  Two = 'Two',
}

export enum ListingAgreement {
  ExclusiveAgency = 'Exclusive Agency',
  ExclusiveRightToLease = 'Exclusive Right To Lease',
  ExclusiveRightToSell = 'Exclusive Right To Sell',
}

export enum ListingService {
  FullService = 'Full Service',
  LimitedService = 'Limited Service',
}

export enum ListingTerm {
  Cash = 'Cash',
  Conventional = 'Conventional',
  Fha = 'FHA',
  LeasePurchase = 'Lease Purchase',
  Other = 'Other',
  PrivateFinancingAvailable = 'Private Financing Available',
  Trade = 'Trade',
  USDALoan = 'USDA Loan',
  VALoan = 'VA Loan',
}

export enum MFRAssociationFeeRequirement {
  None = 'None',
  Optional = 'Optional',
  Required = 'Required',
}

export enum MFRCOMTransactionTerms {
  ForExchange = 'For Exchange',
  NoSmoking = 'No Smoking',
}

export enum MFRCOMTransactionType {
  BusinessOpportunityCommercialSale = 'Business Opportunity,Commercial Sale',
  CommercialLease = 'Commercial Lease',
  CommercialLeaseCommercialSale = 'Commercial Lease,Commercial Sale',
  CommercialSale = 'Commercial Sale',
}

export enum MFRContractStatus {
  AppraisalFinancingInspections = 'Appraisal,Financing,Inspections',
  AppraisalInspections = 'Appraisal,Inspections',
  Financing = 'Financing',
  FinancingInspections = 'Financing,Inspections',
  FinancingInspectionsOtherContractContingencies = 'Financing,Inspections,Other Contract Contingencies',
  Inspections = 'Inspections',
  InspectionsOtherContractContingencies = 'Inspections,Other Contract Contingencies',
  LetterOfIntent = 'Letter Of Intent',
  NoContingency = 'No Contingency',
  OtherContractContingencies = 'Other Contract Contingencies',
}

export enum MFREscrowAgentFax {
  The3524374880 = '352-437-4880',
  The4074787989 = '407-478-7989',
}

export enum MfrEscrowState {
  FL = 'FL',
}

export enum MFRMasterBedSize {
  King = 'King',
  Queen = 'Queen',
}

export enum MFRMinimumLease {
  NoMinimum = 'No Minimum',
  The12Years = '1-2 Years',
  The17Days = '1-7 Days',
  The1Month = '1 Month',
  The1Week = '1 Week',
  The2Months = '2 Months',
  The2Weeks = '2 Weeks',
  The3Months = '3 Months',
  The6Months = '6 Months',
  The7Months = '7 Months',
  The812Months = '8-12  Months',
}

export enum MfrMlsMajorChangeType {
  Active = 'Active',
  BackOnMarket = 'Back On Market',
  Canceled = 'Canceled',
  Expired = 'Expired',
  Incomplete = 'Incomplete',
  Leased = 'Leased',
  NewListing = 'New Listing',
  Pending = 'Pending',
  PriceDecrease = 'Price Decrease',
  PriceIncrease = 'Price Increase',
  Sold = 'Sold',
  TemporarilyOffMarket = 'Temporarily Off-Market',
  Withdrawn = 'Withdrawn',
}

export enum MFRPetSize {
  ExtraLarge101Lbs = 'Extra Large (101+ Lbs.)',
  Large61100Lbs = 'Large (61-100 Lbs.)',
  Medium3660Lbs = 'Medium (36-60 Lbs.)',
  Small1635Lbs = 'Small (16-35 Lbs.)',
  VerySmallUnder15Lbs = 'Very Small (Under 15 Lbs.)',
}

export enum MFRRealtorInfoConfidential {
  BonusToSellingOffice = 'Bonus to Selling Office',
  BonusToSellingOfficeGoToSite = 'Bonus to Selling Office,Go To Site',
  CopyOfLeaseAvailable = 'Copy of Lease Available',
  GoToSite = 'Go To Site',
  TenantApproval = 'Tenant Approval',
  Vacant = 'Vacant',
}

export enum MFRReferralFee {
  The0 = '$0',
  The10 = '10%',
  The100 = '$100',
  The25 = '$25',
  The50 = '$50',
  The75 = '$75',
}

export enum MFRRepresentation {
  SellerNotRepresented = 'Seller Not Represented',
  SellerRepresented = 'Seller Represented',
}

export enum MFRShowingTime {
  SetAppointment = 'Set Appointment',
  ViewInstructions = 'View Instructions',
}

export enum MFRTotalAcreage {
  NonApplicable = 'Non-Applicable',
  OneToTwoAcres = 'One + to Two Acres',
  The0ToLessThan14 = '0 to less than 1/4',
  The100ToLessThan200 = '100 to less than 200',
  The10ToLessThan20 = '10 to less than 20',
  The12AcreTo1Acre = '1/2 Acre to 1 Acre',
  The12ToLessThan1 = '1/2 to less than 1',
  The14AcreTo21779SqFt = '1/4 Acre to 21779 Sq. Ft.',
  The14ToLessThan12 = '1/4 to less than 1/2',
  The1ToLessThan2 = '1 to less than 2',
  The20ToLessThan50 = '20 to less than 50',
  The2ToLessThan5 = '2 to less than 5',
  The50ToLessThan100 = '50 to less than 100',
  The5ToLessThan10 = '5 to less than 10',
  UpTo10889SqFt = 'Up to 10,889 Sq. Ft.',
}

export enum MajorChangeType {
  Active = 'Active',
  BackOnMarket = 'Back On Market',
  Canceled = 'Canceled',
  Closed = 'Closed',
  Expired = 'Expired',
  Hold = 'Hold',
  NewListing = 'New Listing',
  Pending = 'Pending',
  PriceChange = 'Price Change',
  Withdrawn = 'Withdrawn',
}

export interface Media {
  Order: number;
  LongDescription?: string;
  MediaType: MediaType;
  ImageWidth: number;
  ImageHeight: number;
  ImageSizeDescription: string;
  MediaURL: string;
  MediaModificationTimestamp: Date;
  MediaKey: string;
}

export enum MediaType {
  Jpg = 'jpg',
}

export enum MlgCanUse {
  Bo = 'BO',
  Idx = 'IDX',
  Vow = 'VOW',
}

export enum OccupantType {
  Owner = 'Owner',
  Tenant = 'Tenant',
  Vacant = 'Vacant',
}

export enum OriginatingSystemName {
  Mfrmls = 'mfrmls',
}

export enum OwnerPay {
  CableTV = 'Cable TV',
  Electricity = 'Electricity',
  Gas = 'Gas',
  GroundsCare = 'Grounds Care',
  Internet = 'Internet',
  Laundry = 'Laundry',
  Other = 'Other',
  PestControl = 'Pest Control',
  PoolMaintenance = 'Pool Maintenance',
  Recreational = 'Recreational',
  Security = 'Security',
  Sewer = 'Sewer',
  Telephone = 'Telephone',
  TrashCollection = 'Trash Collection',
  Water = 'Water',
}

export enum Ownership {
  CoOp = 'Co-op',
  Condominium = 'Condominium',
  Corporation = 'Corporation',
  FeeSimple = 'Fee Simple',
  Other = 'Other',
  SoleProprietor = 'Sole Proprietor',
}

export enum PatioAndPorchFeature {
  Covered = 'Covered',
  Deck = 'Deck',
  Enclosed = 'Enclosed',
  FrontPorch = 'Front Porch',
  Patio = 'Patio',
  Porch = 'Porch',
  RearPorch = 'Rear Porch',
  Screened = 'Screened',
}

export enum Feature {
  AutoCleaner = 'Auto Cleaner',
  ChildSafetyFence = 'Child Safety Fence',
  Gunite = 'Gunite',
  Heated = 'Heated',
  InGround = 'In Ground',
  Indoor = 'Indoor',
  _Infinity = 'Infinity',
  Lighting = 'Lighting',
  Other = 'Other',
  OutsideBathAccess = 'Outside Bath Access',
  SaltWater = 'Salt Water',
  ScreenEnclosure = 'Screen Enclosure',
  SolarCover = 'Solar Cover',
}

export enum PropertyCondition {
  Completed = 'Completed',
  Fixer = 'Fixer',
  PreConstruction = 'Pre-Construction',
  Proposed = 'Proposed',
  UnderConstruction = 'Under Construction',
}

export enum PropertySubType {
  Agriculture = 'Agriculture',
  Business = 'Business',
  Commercial = 'Commercial',
  CondoHotel = 'Condo - Hotel',
  Condominium = 'Condominium',
  Duplex = 'Duplex',
  Farm = 'Farm',
  Industrial = 'Industrial',
  ManufacturedHome = 'Manufactured Home',
  MixedUse = 'Mixed Use',
  MobileHome = 'Mobile Home',
  MultiFamily = 'Multi-Family',
  Office = 'Office',
  Quadruplex = 'Quadruplex',
  Ranch = 'Ranch',
  Residential = 'Residential',
  Retail = 'Retail',
  SingleFamilyResidence = 'Single Family Residence',
  Townhouse = 'Townhouse',
  UnimprovedLand = 'Unimproved Land',
  Villa = 'Villa',
  Warehouse = 'Warehouse',
}

export enum PropertyType {
  CommercialLease = 'Commercial Lease',
  CommercialSale = 'Commercial Sale',
  Land = 'Land',
  Residential = 'Residential',
  ResidentialIncome = 'Residential Income',
  ResidentialLease = 'Residential Lease',
}

export enum Roof {
  BuiltUp = 'Built-Up',
  Cement = 'Cement',
  Concrete = 'Concrete',
  Membrane = 'Membrane',
  Metal = 'Metal',
  Other = 'Other',
  Shake = 'Shake',
  Shingle = 'Shingle',
  Slate = 'Slate',
  Tile = 'Tile',
}

export interface Room {
  RoomKey: string;
  RoomDimensions?: string;
  RoomLength?: number;
  RoomLevel?: RoomLevel;
  RoomType: string;
  RoomWidth?: number;
  MFR_RoomFlooring?: Flooring;
  RoomDescription?: string;
  RoomFeatures?: string[];
}

export enum RoomLevel {
  First = 'First',
  Second = 'Second',
  Third = 'Third',
}

export enum Sewer {
  None = 'None',
  PublicSewer = 'Public Sewer',
  SepticNeeded = 'Septic Needed',
  SepticTank = 'Septic Tank',
}

export enum ShowingRequirement {
  AppointmentOnly = 'Appointment Only',
  CallBeforeShowing = 'Call Before Showing',
  CallListingAgent = 'Call Listing Agent',
  CallListingAgent2 = 'Call Listing Agent 2',
  CallListingOffice = 'Call Listing Office',
  CallManager = 'Call Manager',
  CallOwner = 'Call Owner',
  CombinationLockBox = 'Combination Lock Box',
  ContactCallCenter = 'Contact Call Center',
  DoNotContactTenants = 'Do Not Contact Tenants',
  FarmAnimalsOnSite = 'Farm Animals on Site',
  GateCodeRequired = 'Gate Code Required',
  GateKeyInListingOff = 'Gate Key In Listing Off',
  GoDirect = 'Go Direct',
  GuardDog = 'Guard Dog',
  KeyAgent = 'Key/Agent',
  KeyInOffice = 'Key In Office',
  ListingAgentMustAccompany = 'Listing Agent Must Accompany',
  LockBoxCoded = 'Lock Box Coded',
  LockBoxElectronic = 'Lock Box Electronic',
  LockedGate = 'Locked Gate',
  NoSign = 'No Sign',
  Occupied = 'Occupied',
  Other = 'Other',
  PetSOnPremises = 'Pet(s) on Premises',
  SeeRemarks = 'See Remarks',
  ShowingTime = 'ShowingTime',
  The24HourNotice = '24 Hour Notice',
  UnderConstruction = 'Under Construction',
}

export enum SpecialListingCondition {
  None = 'None',
  ShortSale = 'Short Sale',
}

export enum StreetDirPrefix {
  E = 'E',
  N = 'N',
  S = 'S',
  SE = 'SE',
  W = 'W',
}

export enum StreetSuffix {
  Alley = 'ALLEY',
  Avenue = 'AVENUE',
  Boulevard = 'BOULEVARD',
  Circle = 'CIRCLE',
  Court = 'COURT',
  Drive = 'DRIVE',
  Glen = 'GLEN',
  Highway = 'HIGHWAY',
  Lane = 'LANE',
  Loop = 'LOOP',
  Parkway = 'PARKWAY',
  Place = 'PLACE',
  Road = 'ROAD',
  Street = 'STREET',
  Terrace = 'TERRACE',
  Trail = 'TRAIL',
  Way = 'WAY',
}

export enum SyndicateTo {
  ApartmentsCOMNetwork = 'Apartments.com Network',
  FacebookMarketplace = 'Facebook Marketplace',
  HomeSnap = 'HomeSnap',
  HomesCOM = 'Homes.com',
  InternationalMLS = 'International MLS',
  RealtorCOM = 'Realtor.com',
  ZillowTrulia = 'Zillow/Trulia',
}

export enum TenantPay {
  CarpetCleaningFee = 'Carpet Cleaning Fee',
  CleaningFee = 'Cleaning Fee',
  Electricity = 'Electricity',
  ReKeyFee = 'Re-Key Fee',
  Sewer = 'Sewer',
  Water = 'Water',
}

export interface UnitType {
  UnitTypeKey: string;
  UnitTypeType: UnitTypeType;
  UnitTypeUnitsTotal?: number;
  UnitTypeGarageAttachedYN?: boolean;
  UnitTypeGarageSpaces?: number;
  MFR_UnitTypeHeatedSqFt?: string;
  UnitTypeProForma?: number;
  MFR_UnitTypeNumberOfUnitsOccupied?: string;
}

export enum UnitTypeType {
  OneBedOneBath = 'One Bed/One Bath',
  ThreeBedOneBath = 'Three Bed/One Bath',
  TwoBedOneBath = 'Two Bed/One Bath',
  TwoBedTwoBath = 'Two Bed/Two Bath',
}

export enum Utility {
  BBHSInternetAvailable = 'BB/HS Internet Available',
  BBHSInternetCapable = 'BB/HS Internet Capable',
  CableAvailable = 'Cable Available',
  CableConnected = 'Cable Connected',
  ElectricalNearby = 'Electrical Nearby',
  ElectricityAvailable = 'Electricity Available',
  ElectricityConnected = 'Electricity Connected',
  FiberOptics = 'Fiber Optics',
  FireHydrant = 'Fire Hydrant',
  MiniSewer = 'Mini Sewer',
  NaturalGasAvailable = 'Natural Gas Available',
  NaturalGasConnected = 'Natural Gas Connected',
  Other = 'Other',
  PhoneAvailable = 'Phone Available',
  Private = 'Private',
  Public = 'Public',
  SewerAvailable = 'Sewer Available',
  SewerConnected = 'Sewer Connected',
  SewerNearby = 'Sewer Nearby',
  SprinklerMeter = 'Sprinkler Meter',
  SprinklerRecycled = 'Sprinkler Recycled',
  SprinklerWell = 'Sprinkler Well',
  StreetLights = 'Street Lights',
  TelephoneNearby = 'Telephone Nearby',
  UndergroundUtilities = 'Underground Utilities',
  WaterAvailable = 'Water Available',
  WaterConnected = 'Water Connected',
  WaterMultipleMeters = 'Water - Multiple Meters',
  WaterNearby = 'Water Nearby',
}

export enum Vegetation {
  FruitTrees = 'Fruit Trees',
  MatureLandscaping = 'Mature Landscaping',
  OakTrees = 'Oak Trees',
  TreesLandscaped = 'Trees/Landscaped',
  Wooded = 'Wooded',
}

export enum View {
  City = 'City',
  Garden = 'Garden',
  GolfCourse = 'Golf Course',
  ParkGreenbelt = 'Park/Greenbelt',
  Pool = 'Pool',
  TreesWoods = 'Trees/Woods',
  Water = 'Water',
}

export enum WaterSource {
  CanalLakeForIrrigation = 'Canal/Lake For Irrigation',
  None = 'None',
  Private = 'Private',
  Public = 'Public',
  Well = 'Well',
  WellRequired = 'Well Required',
}

export enum WindowFeature {
  Blinds = 'Blinds',
  Drapes = 'Drapes',
  ENERGYSTARQualifiedWindows = 'ENERGY STAR Qualified Windows',
  LowEmissivityWindows = 'Low Emissivity Windows',
  Shades = 'Shades',
  Shutters = 'Shutters',
  ThermalWindows = 'Thermal Windows',
  WindowTreatments = 'Window Treatments',
}

export type PropertyImage = {
  url: string;
  order: number;
};
