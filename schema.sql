-- FNO Dashboard Schema
-- DB: silverwebbuzz_in_ms

CREATE TABLE IF NOT EXISTS fno_margins (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    symbol        VARCHAR(30)    NOT NULL,
    expiry        VARCHAR(20)    NOT NULL,
    lot_size      INT            DEFAULT 0,
    nrml_margin   DECIMAL(12,2)  DEFAULT 0,
    mis_margin    DECIMAL(12,2)  DEFAULT 0,
    nrml_margin_rate DECIMAL(6,2) DEFAULT 0,
    futures_price DECIMAL(12,2)  DEFAULT 0,
    mwpl          DECIMAL(6,2)   DEFAULT 0,
    fetched_date  DATE           NOT NULL,
    created_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_symbol_expiry_date (symbol, expiry, fetched_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS fno_prices (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    symbol              VARCHAR(30)   NOT NULL UNIQUE,
    company_name        VARCHAR(100)  DEFAULT '',
    industry            VARCHAR(100)  DEFAULT '',
    current_price       DECIMAL(12,2) DEFAULT 0,
    open_price          DECIMAL(12,2) DEFAULT 0,
    high_price          DECIMAL(12,2) DEFAULT 0,
    low_price           DECIMAL(12,2) DEFAULT 0,
    close_price         DECIMAL(12,2) DEFAULT 0,
    prev_close          DECIMAL(12,2) DEFAULT 0,
    change_amount       DECIMAL(12,2) DEFAULT 0,
    change_percent      DECIMAL(8,2)  DEFAULT 0,
    volume              BIGINT        DEFAULT 0,
    total_traded_value  DECIMAL(18,2) DEFAULT 0,
    week52_high         DECIMAL(12,2) DEFAULT 0,
    week52_low          DECIMAL(12,2) DEFAULT 0,
    delivery_qty        BIGINT        DEFAULT 0,
    delivery_pct        DECIMAL(6,2)  DEFAULT 0,
    fetched_at          TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS fno_oi (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    symbol         VARCHAR(30)   NOT NULL,
    expiry         VARCHAR(20)   NOT NULL,
    open_interest  BIGINT        DEFAULT 0,
    oi_change      BIGINT        DEFAULT 0,
    oi_change_pct  DECIMAL(8,2)  DEFAULT 0,
    pcr            DECIMAL(6,2)  DEFAULT 0,
    fetched_at     TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uq_symbol_expiry (symbol, expiry)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
