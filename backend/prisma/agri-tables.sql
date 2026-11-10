CREATE TABLE IF NOT EXISTS agri_sources (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  url  TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS agri_sources_name_key ON agri_sources(name);

CREATE TABLE IF NOT EXISTS districts (
  id       TEXT PRIMARY KEY,
  name_en  TEXT NOT NULL,
  name_bn  TEXT,
  division TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS districts_name_en_key ON districts(name_en);

CREATE TABLE IF NOT EXISTS soils (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS soils_name_key ON soils(name);

CREATE TABLE IF NOT EXISTS seasons (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS seasons_name_key ON seasons(name);

CREATE TABLE IF NOT EXISTS crops (
  id       TEXT PRIMARY KEY,
  name_en  TEXT NOT NULL,
  name_bn  TEXT,
  category TEXT NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS crops_name_en_key ON crops(name_en);

CREATE TABLE IF NOT EXISTS district_soils (
  id          TEXT PRIMARY KEY,
  district_id TEXT NOT NULL REFERENCES districts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  soil_id     TEXT NOT NULL REFERENCES soils(id) ON DELETE CASCADE ON UPDATE CASCADE,
  share_pct   DOUBLE PRECISION,
  source      TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS district_soils_district_id_soil_id_key ON district_soils(district_id, soil_id);

CREATE TABLE IF NOT EXISTS district_crops (
  id             TEXT PRIMARY KEY,
  district_id    TEXT NOT NULL REFERENCES districts(id) ON DELETE CASCADE ON UPDATE CASCADE,
  crop_id        TEXT NOT NULL REFERENCES crops(id) ON DELETE CASCADE ON UPDATE CASCADE,
  year           INTEGER NOT NULL,
  area_acre      DOUBLE PRECISION,
  production_ton DOUBLE PRECISION,
  source         TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS district_crops_district_id_crop_id_year_key ON district_crops(district_id, crop_id, year);

CREATE TABLE IF NOT EXISTS crop_soils (
  id      TEXT PRIMARY KEY,
  crop_id TEXT NOT NULL REFERENCES crops(id) ON DELETE CASCADE ON UPDATE CASCADE,
  soil_id TEXT NOT NULL REFERENCES soils(id) ON DELETE CASCADE ON UPDATE CASCADE,
  rating  INTEGER NOT NULL,
  source  TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS crop_soils_crop_id_soil_id_key ON crop_soils(crop_id, soil_id);

CREATE TABLE IF NOT EXISTS crop_seasons (
  id        TEXT PRIMARY KEY,
  crop_id   TEXT NOT NULL REFERENCES crops(id) ON DELETE CASCADE ON UPDATE CASCADE,
  season_id TEXT NOT NULL REFERENCES seasons(id) ON DELETE CASCADE ON UPDATE CASCADE,
  source    TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS crop_seasons_crop_id_season_id_key ON crop_seasons(crop_id, season_id);

CREATE TABLE IF NOT EXISTS crop_cultivation (
  id                    TEXT PRIMARY KEY,
  crop_id               TEXT NOT NULL REFERENCES crops(id) ON DELETE CASCADE ON UPDATE CASCADE,
  seed_rate_kg_per_acre DOUBLE PRECISION,
  yield_min             DOUBLE PRECISION,
  yield_max             DOUBLE PRECISION,
  duration_days         INTEGER,
  water_need            TEXT,
  source                TEXT
);
CREATE UNIQUE INDEX IF NOT EXISTS crop_cultivation_crop_id_key ON crop_cultivation(crop_id);

CREATE TABLE IF NOT EXISTS crop_diseases (
  id         TEXT PRIMARY KEY,
  crop_id    TEXT NOT NULL REFERENCES crops(id) ON DELETE CASCADE ON UPDATE CASCADE,
  name       TEXT NOT NULL,
  symptom    TEXT NOT NULL,
  cause      TEXT NOT NULL,
  management TEXT NOT NULL,
  image_urls TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  source     TEXT
);