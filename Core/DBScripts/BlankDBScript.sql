USE [WalletDB]

Go

DROP TABLE IF EXISTS [dbo].[FundType]
DROP TABLE IF EXISTS [dbo].[WalletAccount]
DROP TABLE IF EXISTS [dbo].[PatronDevice]
DROP TABLE IF EXISTS [dbo].[PatronWallet]
DROP TABLE IF EXISTS [dbo].[ExternalInterfacePermissions]

DROP TABLE IF EXISTS [dbo].[ExternalInterface_Merchant_Map]

DROP TABLE IF EXISTS [dbo].[KeyStore]
DROP TABLE IF EXISTS [dbo].[MerchantAccount_Group]


DROP TABLE IF EXISTS [dbo].[Merchant]
DROP TABLE IF EXISTS [dbo].[Corporate]

DROP TABLE IF EXISTS [dbo].[AuditHistory]
DROP TABLE IF EXISTS [dbo].[Transaction]
DROP TABLE IF EXISTS [dbo].[Account]

DROP TABLE IF EXISTS [dbo].[ExternalInterface]
DROP TABLE IF EXISTS [dbo].[Tenant]
DROP TABLE IF EXISTS [dbo].[OperationType]
DROP TABLE IF EXISTS [dbo].[AccountType]

Go


GO
/****** Object:  Table [dbo].[Account]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[Account_ID] [int] IDENTITY(1,1) NOT NULL,
	[Tenant_ID] [int] NOT NULL,
	[AccountType_Code] [nchar](10) NOT NULL,
	[IsInternalAccount] [bit] NOT NULL,
	[Account_Name] [varchar](200) NOT NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[Account_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AccountType]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AccountType](
	[AccountType_Code] [nchar](10) NOT NULL,
	[Category] [nchar](10) NOT NULL,
	[Description] [varchar](500) NOT NULL,
 CONSTRAINT [PK_AccountType] PRIMARY KEY CLUSTERED 
(
	[AccountType_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AuditHistory]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AuditHistory](
	[AuditHistory_ID] [uniqueidentifier] NOT NULL,
	[AuditType] [nchar](10) NOT NULL,
	[AuditValue] [varchar](200) NOT NULL,
	[AuditDescription] [varchar](200) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Corporate]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Corporate](
	[Corporate_ID] [int] IDENTITY(1,1) NOT NULL,
	[Tenant_ID] [int] NOT NULL,
	[Corporate_Name] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_Corporate] PRIMARY KEY CLUSTERED 
(
	[Corporate_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExternalInterfacePermissions]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExternalInterfacePermissions](
	[EnternalInterface_ID] [int] NOT NULL,
	[OperationType_Code] [nchar](10) NOT NULL,
	[isAuthorized] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExternalInterface]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExternalInterface](
	[ExternalInterface_ID] [int] IDENTITY(1,1) NOT NULL,
	[Account_ID] [int] NOT NULL,
	[ExternalInterfacePropertyCode] [nchar](20) NOT NULL,
 CONSTRAINT [PK_ExternalInterface] PRIMARY KEY CLUSTERED 
(
	[ExternalInterface_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ExternalInterface_Merchant_Map]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ExternalInterface_Merchant_Map](
	[Merchant_ID] [int] NOT NULL,
	[ExternalInterface_ID] [int] NOT NULL,
 CONSTRAINT [PK_ExternalInterface_Merchant_Map_1] PRIMARY KEY CLUSTERED 
(
	[Merchant_ID] ASC,
	[ExternalInterface_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FundType]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FundType](
	[FundType_Code] [nchar](10) NOT NULL,
	[Description] [varchar](200) NOT NULL,
 CONSTRAINT [PK_FundType] PRIMARY KEY CLUSTERED 
(
	[FundType_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KeyStore]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KeyStore](
	[Tenant_ID] [int] NOT NULL,
	[API_key] [varchar](200) NOT NULL,
	[Secret_key] [varchar](200) NOT NULL,
	[MA_Group_ID] [int] NOT NULL,
 CONSTRAINT [PK_KeyStore] PRIMARY KEY CLUSTERED 
(
	[Tenant_ID] ASC,
	[API_key] ASC,
	[Secret_key] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Merchant]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Merchant](
	[Merchant_ID] [int] IDENTITY(1,1) NOT NULL,
	[Corporate_ID] [int] NOT NULL,
	[Merchant_Name] [nvarchar](200) NOT NULL,
	[EveriTiPropertyCode] [nchar](20) NOT NULL,
 CONSTRAINT [PK_Merchant] PRIMARY KEY CLUSTERED 
(
	[Merchant_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MerchantAccount_Group]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MerchantAccount_Group](
	[MA_GroupID] [int] IDENTITY(1,1) NOT NULL,
	[Merchant_ID] [int] NOT NULL,
	[Account_ID] [int] NOT NULL,
 CONSTRAINT [PK_MerchantAccount_Group] PRIMARY KEY CLUSTERED 
(
	[Merchant_ID] ASC,
	[Account_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[OperationType]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OperationType](
	[OperationType_Code] [nchar](10) NOT NULL,
	[OperationType_Desc] [varchar](200) NOT NULL,
 CONSTRAINT [PK_OperationType] PRIMARY KEY CLUSTERED 
(
	[OperationType_Code] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PatronDevice]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatronDevice](
	[PatronDevice_ID] [int] IDENTITY(1,1) NOT NULL,
	[Wallet_ID] [int] NOT NULL,
	[DeviceIdentifier] [varchar](100) NOT NULL,
 CONSTRAINT [PK_PatronDevice] PRIMARY KEY CLUSTERED 
(
	[PatronDevice_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PatronWallet]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PatronWallet](
	[Wallet_ID] [int] IDENTITY(1,1) NOT NULL,
	[Tenant_ID] [int] NOT NULL,
	[EveriPatron_ID] VARCHAR(50) NOT NULL,
	[ExternalWallet_ID] INT NOT NULL,
 CONSTRAINT [PK_Wallet] PRIMARY KEY CLUSTERED 
(
	[Tenant_ID] ASC,
	[EveriPatron_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tenant]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tenant](
	[Tenant_ID] [int] IDENTITY(1,1) NOT NULL,
	[Tenant_Name] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_Tenant] PRIMARY KEY CLUSTERED 
(
	[Tenant_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transaction]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transaction](
	[Transaction_ID] BIGINT NOT NULL,
	[Wallet_ID] INT,
	[SourceFundType] [nchar](10),
	[SourceAmount] [int],
	[SourceSystem] [varchar](100),
	[SourceAddress] [varchar](100),
	[DestintationFundType] [nchar](6),
	[DestinationAmount] [int],
	[DestintationSystem] [varchar](100),
	[DestinationAddress] [varchar](100),
	[TransactionType] [nchar](10),
PRIMARY KEY CLUSTERED 
(
	[Transaction_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[WalletAccount]    Script Date: 8/20/2018 4:27:57 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WalletAccount](
	[Wallet_ID] [int] NOT NULL,
	[Account_ID] [int] NOT NULL,
	[Balance] [int] NOT NULL,
	[Limit] [int] NOT NULL,
	[ExternalAccount_ID] [nchar](20) NOT NULL,
 CONSTRAINT [PK_PatronAccount_1] PRIMARY KEY CLUSTERED 
(
	[Wallet_ID] ASC,
	[Account_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_ExternalInterface]    Script Date: 8/20/2018 4:27:57 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_ExternalInterface] ON [dbo].[ExternalInterface]
(
	[ExternalInterface_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_Merchant]    Script Date: 8/20/2018 4:27:57 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_Merchant] ON [dbo].[Merchant]
(
	[Merchant_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
/****** Object:  Index [IX_MerchantAccount_Group]    Script Date: 8/20/2018 4:27:57 PM ******/
CREATE UNIQUE NONCLUSTERED INDEX [IX_MerchantAccount_Group] ON [dbo].[MerchantAccount_Group]
(
	[MA_GroupID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Account] ADD  CONSTRAINT [DF_Account_IsInternalAccount]  DEFAULT ((1)) FOR [IsInternalAccount]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_AccountType] FOREIGN KEY([AccountType_Code])
REFERENCES [dbo].[AccountType] ([AccountType_Code])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_AccountType]
GO
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Tenant] FOREIGN KEY([Tenant_ID])
REFERENCES [dbo].[Tenant] ([Tenant_ID])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Tenant]
GO
ALTER TABLE [dbo].[Corporate]  WITH CHECK ADD  CONSTRAINT [FK_Tenant_TenantID_Corporate_TenantID] FOREIGN KEY([Tenant_ID])
REFERENCES [dbo].[Tenant] ([Tenant_ID])
GO
ALTER TABLE [dbo].[Corporate] CHECK CONSTRAINT [FK_Tenant_TenantID_Corporate_TenantID]
GO
ALTER TABLE [dbo].[ExternalInterfacePermissions]  WITH CHECK ADD  CONSTRAINT [FK_ExternalInterfacePermissions_ExternalInterface] FOREIGN KEY([EnternalInterface_ID])
REFERENCES [dbo].[ExternalInterface] ([ExternalInterface_ID])
GO
ALTER TABLE [dbo].[ExternalInterfacePermissions] CHECK CONSTRAINT [FK_ExternalInterfacePermissions_ExternalInterface]
GO
ALTER TABLE [dbo].[ExternalInterfacePermissions]  WITH CHECK ADD  CONSTRAINT [FK_ExternalInterfacePermissions_OperationType] FOREIGN KEY([OperationType_Code])
REFERENCES [dbo].[OperationType] ([OperationType_Code])
GO
ALTER TABLE [dbo].[ExternalInterfacePermissions] CHECK CONSTRAINT [FK_ExternalInterfacePermissions_OperationType]
GO
ALTER TABLE [dbo].[ExternalInterface]  WITH CHECK ADD  CONSTRAINT [FK_ExternalInterface_Account] FOREIGN KEY([Account_ID])
REFERENCES [dbo].[Account] ([Account_ID])
GO
ALTER TABLE [dbo].[ExternalInterface] CHECK CONSTRAINT [FK_ExternalInterface_Account]
GO
ALTER TABLE [dbo].[ExternalInterface_Merchant_Map]  WITH CHECK ADD  CONSTRAINT [FK_ExternalInterface_Merchant_Map_ExternalInterface] FOREIGN KEY([ExternalInterface_ID])
REFERENCES [dbo].[ExternalInterface] ([ExternalInterface_ID])
GO
ALTER TABLE [dbo].[ExternalInterface_Merchant_Map] CHECK CONSTRAINT [FK_ExternalInterface_Merchant_Map_ExternalInterface]
GO
ALTER TABLE [dbo].[ExternalInterface_Merchant_Map]  WITH CHECK ADD  CONSTRAINT [FK_ExternalInterface_Merchant_Map_Merchant] FOREIGN KEY([Merchant_ID])
REFERENCES [dbo].[Merchant] ([Merchant_ID])
GO
ALTER TABLE [dbo].[ExternalInterface_Merchant_Map] CHECK CONSTRAINT [FK_ExternalInterface_Merchant_Map_Merchant]
GO
ALTER TABLE [dbo].[KeyStore]  WITH CHECK ADD  CONSTRAINT [FK_KeyStore_MerchantAccount_Group] FOREIGN KEY([MA_Group_ID])
REFERENCES [dbo].[MerchantAccount_Group] ([MA_GroupID])
GO
ALTER TABLE [dbo].[KeyStore] CHECK CONSTRAINT [FK_KeyStore_MerchantAccount_Group]
GO
ALTER TABLE [dbo].[KeyStore]  WITH CHECK ADD  CONSTRAINT [FK_KeyStore_Tenant] FOREIGN KEY([Tenant_ID])
REFERENCES [dbo].[Tenant] ([Tenant_ID])
GO
ALTER TABLE [dbo].[KeyStore] CHECK CONSTRAINT [FK_KeyStore_Tenant]
GO
ALTER TABLE [dbo].[Merchant]  WITH CHECK ADD  CONSTRAINT [FK_Merchant_Corporate_CorporateID] FOREIGN KEY([Corporate_ID])
REFERENCES [dbo].[Corporate] ([Corporate_ID])
GO
ALTER TABLE [dbo].[Merchant] CHECK CONSTRAINT [FK_Merchant_Corporate_CorporateID]
GO
ALTER TABLE [dbo].[MerchantAccount_Group]  WITH CHECK ADD  CONSTRAINT [FK_MerchantAccount_Group_Account] FOREIGN KEY([Account_ID])
REFERENCES [dbo].[Account] ([Account_ID])
GO
ALTER TABLE [dbo].[MerchantAccount_Group] CHECK CONSTRAINT [FK_MerchantAccount_Group_Account]
GO
ALTER TABLE [dbo].[MerchantAccount_Group]  WITH CHECK ADD  CONSTRAINT [FK_MerchantAccount_Group_Merchant] FOREIGN KEY([Merchant_ID])
REFERENCES [dbo].[Merchant] ([Merchant_ID])
GO
ALTER TABLE [dbo].[MerchantAccount_Group] CHECK CONSTRAINT [FK_MerchantAccount_Group_Merchant]
GO
ALTER TABLE [dbo].[PatronWallet]  WITH CHECK ADD  CONSTRAINT [FK_Wallet_Tenant] FOREIGN KEY([Tenant_ID])
REFERENCES [dbo].[Tenant] ([Tenant_ID])
GO
ALTER TABLE [dbo].[PatronWallet] CHECK CONSTRAINT [FK_Wallet_Tenant]
GO
ALTER TABLE [dbo].[WalletAccount]  WITH CHECK ADD  CONSTRAINT [FK_PatronAccount_Account] FOREIGN KEY([Account_ID])
REFERENCES [dbo].[Account] ([Account_ID])
GO
ALTER TABLE [dbo].[WalletAccount] CHECK CONSTRAINT [FK_PatronAccount_Account]

GO


INSERT INTO [dbo].[Tenant] ([Tenant_Name]) VALUES ('MGM Resorts International')
INSERT INTO [dbo].[Tenant] ([Tenant_Name]) VALUES ('Wynn Resorts Global')

GO

INSERT INTO [dbo].[Corporate] ([Tenant_ID] ,[Corporate_Name]) VALUES (1 ,'MGM USA')
INSERT INTO [dbo].[Corporate] ([Tenant_ID] ,[Corporate_Name]) VALUES (1 ,'MGM Macau')
INSERT INTO [dbo].[Corporate] ([Tenant_ID] ,[Corporate_Name]) VALUES (2 ,'Wynn USA')
INSERT INTO [dbo].[Corporate] ([Tenant_ID] ,[Corporate_Name]) VALUES (2 ,'Wynn Macau')

GO

INSERT INTO [dbo].[Merchant] ([Corporate_ID] ,[Merchant_Name] ,[EveriTiPropertyCode]) VALUES (1 , 'MGM Grand', '1001')
INSERT INTO [dbo].[Merchant] ([Corporate_ID] ,[Merchant_Name] ,[EveriTiPropertyCode]) VALUES (1 , 'New York New Yotk', '1002')
INSERT INTO [dbo].[Merchant] ([Corporate_ID] ,[Merchant_Name] ,[EveriTiPropertyCode]) VALUES (1 , 'ARIA', '1003')

GO

INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('EVICASH' ,'DEPOSIT', 'Everi Cash Deposit')
INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('FRONTMONEY' ,'DEPOSIT', 'Front Money')

INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('CREDITLINE' ,'CREDIT', 'Credit Line Increase')
INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('CHECKBOOST' ,'CREDIT', 'Check Boost')

INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('SLOTS' ,'GAMING', 'SLOTS')
INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('SPORTS' ,'GAMING', 'Sports')

INSERT INTO [dbo].[AccountType] ([AccountType_Code] ,[Category] ,[Description]) VALUES ('HOTEL' ,'FOODANDBEV', 'Everi Cash Deposit')

GO

INSERT INTO [dbo].[Account] ([Tenant_ID] ,[AccountType_Code] ,[Account_Name]) VALUES (1, 'EVICASH', 'Everi  Cash' ) 
INSERT INTO [dbo].[Account] ([Tenant_ID] ,[AccountType_Code] ,[Account_Name]) VALUES (1, 'SLOTS', 'MGM EBS 1' )
INSERT INTO [dbo].[Account] ([Tenant_ID] ,[AccountType_Code] ,[Account_Name]) VALUES (1, 'SLOTS', 'MGM EBS 2' )

GO

INSERT INTO [dbo].[MerchantAccount_Group] ([Merchant_ID] ,[Account_ID]) VALUES (1 ,2)
INSERT INTO [dbo].[MerchantAccount_Group] ([Merchant_ID] ,[Account_ID]) VALUES (2 ,2)
INSERT INTO [dbo].[MerchantAccount_Group] ([Merchant_ID] ,[Account_ID]) VALUES (3 ,3)

GO

INSERT INTO [dbo].[KeyStore] ([Tenant_ID] ,[API_key] ,[Secret_key] ,[MA_Group_ID]) VALUES (1 ,'abed1224abcd1234' ,'abed1234abcd1234' ,1)
INSERT INTO [dbo].[KeyStore] ([Tenant_ID] ,[API_key] ,[Secret_key] ,[MA_Group_ID]) VALUES (1 ,'abed1254abcd1234' ,'abed1234abcd1234' ,2)
INSERT INTO [dbo].[KeyStore] ([Tenant_ID] ,[API_key] ,[Secret_key] ,[MA_Group_ID]) VALUES (1 ,'abed1264abcd1234' ,'abed1234abcd1234' ,3)

GO

INSERT INTO [dbo].[ExternalInterface] ([Account_ID] ,[ExternalInterfacePropertyCode]) VALUES (2,'MG1001')
INSERT INTO [dbo].[ExternalInterface] ([Account_ID] ,[ExternalInterfacePropertyCode]) VALUES (2,'NY1002')
INSERT INTO [dbo].[ExternalInterface] ([Account_ID] ,[ExternalInterfacePropertyCode]) VALUES (3,'AR1003')

GO

INSERT INTO [dbo].[ExternalInterface_Merchant_Map] ([Merchant_ID] ,[ExternalInterface_ID]) VALUES (1, 1)
INSERT INTO [dbo].[ExternalInterface_Merchant_Map] ([Merchant_ID] ,[ExternalInterface_ID]) VALUES (2, 2)
INSERT INTO [dbo].[ExternalInterface_Merchant_Map] ([Merchant_ID] ,[ExternalInterface_ID]) VALUES (3, 3)

GO

INSERT INTO [dbo].[OperationType] ([OperationType_Code] ,[OperationType_Desc]) VALUES ('DEPOSIT', 'DEPOSIT')
INSERT INTO [dbo].[OperationType] ([OperationType_Code] ,[OperationType_Desc]) VALUES ('WITHDRAWAL', 'WITHDRAWAL')

GO

INSERT INTO [dbo].[ExternalInterfacePermissions] ([EnternalInterface_ID] ,[OperationType_Code] ,[isAuthorized]) VALUES (1 , 'DEPOSIT' , 1)
INSERT INTO [dbo].[ExternalInterfacePermissions] ([EnternalInterface_ID] ,[OperationType_Code] ,[isAuthorized]) VALUES (1 , 'WITHDRAWAL' , 1)

INSERT INTO [dbo].[ExternalInterfacePermissions] ([EnternalInterface_ID] ,[OperationType_Code] ,[isAuthorized]) VALUES (2 , 'DEPOSIT' , 1)
INSERT INTO [dbo].[ExternalInterfacePermissions] ([EnternalInterface_ID] ,[OperationType_Code] ,[isAuthorized]) VALUES (2 , 'WITHDRAWAL' , 1)

INSERT INTO [dbo].[ExternalInterfacePermissions] ([EnternalInterface_ID] ,[OperationType_Code] ,[isAuthorized]) VALUES (3 , 'DEPOSIT' , 1)
INSERT INTO [dbo].[ExternalInterfacePermissions] ([EnternalInterface_ID] ,[OperationType_Code] ,[isAuthorized]) VALUES (3 , 'WITHDRAWAL' , 1)

GO

INSERT INTO [dbo].[PatronWallet] ([Tenant_ID] ,[EveriPatron_ID], [ExternalWallet_ID]) VALUES (1 ,'EV10001', '12345')

INSERT INTO [dbo].[PatronWallet] ([Tenant_ID] ,[EveriPatron_ID], [ExternalWallet_ID]) VALUES (2 ,'EV10002', '54321')
GO

INSERT INTO [dbo].[PatronDevice] ([Wallet_ID] ,[DeviceIdentifier]) VALUES (1 ,'1234abcd')

GO

INSERT INTO [dbo].[WalletAccount]([Wallet_ID] ,[Account_ID] ,[Balance] ,[Limit] ,[ExternalAccount_ID] ) VALUES (1 ,1 ,2000 ,2000 ,'CMP100001' )

GO

INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('CASH' ,'Money')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('POINTS' ,'Player Points')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('GAMECREDIT' ,'Player Winnings')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('JACKPOT' ,'Player Jackpot')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('BUYIN' ,'Buy In')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('PROMO' ,'Promotion')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('CHECK' ,'CASHIER Check')
INSERT INTO [dbo].[FundType] ([FundType_Code] ,[Description]) VALUES ('FOODNBEVE' ,'Food and Beverages')

GO