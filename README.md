# Rawalpindi Cafe Finder

## WebGIS Lab 03 Project Report

**Student:** Laiba Rafi (24-ARID-2217)  
**Course:** WebGIS Lab 03  
**Study area:** Rawalpindi, Punjab, Pakistan  
**Project:** Pindi Cafe Finder, an interactive cafe directory and route-estimation dashboard

> This README is the complete project report. The contents links jump directly to the numbered topics and subtopics. A formatted Word copy is also available in [`reports/`](reports/Rawalpindi_Cafe_Finder_WebGIS_Lab03_Report.docx).

## Contents

- [Abstract](#abstract)
- [1. Introduction](#1-introduction)
  - [1.1 Problem statement](#11-problem-statement)
  - [1.2 Aim and objectives](#12-aim-and-objectives)
  - [1.3 Scope](#13-scope)
- [2. Study area and dataset](#2-study-area-and-dataset)
  - [2.1 Geographic coverage](#21-geographic-coverage)
  - [2.2 Record fields](#22-record-fields)
  - [2.3 Data quality and attribution](#23-data-quality-and-attribution)
- [3. System design](#3-system-design)
  - [3.1 Interface components](#31-interface-components)
  - [3.2 User workflow](#32-user-workflow)
- [4. Methodology](#4-methodology)
  - [4.1 Directory preparation](#41-directory-preparation)
  - [4.2 Route estimation](#42-route-estimation)
  - [4.3 Time-of-day adjustment](#43-time-of-day-adjustment)
- [5. Technical implementation](#5-technical-implementation)
  - [5.1 Technology stack](#51-technology-stack)
  - [5.2 Application behavior](#52-application-behavior)
- [6. Results and outputs](#6-results-and-outputs)
- [7. Limitations and responsible use](#7-limitations-and-responsible-use)
- [8. Recommended improvements](#8-recommended-improvements)
- [9. Conclusion](#9-conclusion)
- [10. WebGIS concepts](#10-webgis-concepts)
  - [10.1 OpenStreetMap and Leaflet](#101-openstreetmap-and-leaflet)
  - [10.2 Browser geolocation](#102-browser-geolocation)
  - [10.3 Selecting a cafe](#103-selecting-a-cafe)
  - [10.4 Why a routing API is required](#104-why-a-routing-api-is-required)
- [11. User guide and GitHub Pages deployment](#11-user-guide-and-github-pages-deployment)
  - [11.1 Run locally](#111-run-locally)
  - [11.2 Deploy with GitHub Pages](#112-deploy-with-github-pages)
- [Appendix A. Complete cafe inventory](#appendix-a-complete-cafe-inventory)
- [12. References and project files](#12-references-and-project-files)

## Abstract

Pindi Cafe Finder is a browser-based WebGIS project for exploring 37 cafe and coffee-shop listings across Rawalpindi. It combines a searchable directory, neighborhood filtering, a Leaflet map with cafe markers, an in-page details dialog, browser geolocation, and road-route estimates. An animated coffee-themed landing page introduces the dashboard.

The project demonstrates how place records, geographic coordinates, map layers, browser location, and a routing service can be combined in a web interface. Ratings and review counts are directory snapshots. Cafe markers use approximate neighborhood coordinates. Phone numbers and business hours are not maintained in the static dataset; the in-site dialog links to the current Google Maps listing. Route durations start with a traffic-free OSRM result and apply a simple time-band multiplier, so they are estimates rather than live traffic ETAs.

## 1. Introduction

A cafe list can identify businesses, but it does not show how they are distributed across the city or how one might reach a selected destination. A WebGIS application links records to geographic positions and lets users explore those relationships in one place. This project applies that approach to cafes in Rawalpindi.

### 1.1 Problem statement

People comparing cafes may otherwise switch between a directory, a map, and a routing application. Pindi Cafe Finder brings the available listings, map context, selected-place details, and basic route interaction into one dashboard. It is a course project and should not be treated as a comprehensive or verified commercial directory.

### 1.2 Aim and objectives

- Build an interactive WebGIS directory for cafes in Rawalpindi.
- Let users search by cafe name and filter by neighborhood.
- Show listing rating and review-count snapshots beside mapped locations.
- Provide an in-page cafe overview and a direct Google Maps link.
- Demonstrate sample routing and optional device geolocation.

### 1.3 Scope

The project is a static, client-side website. It demonstrates directory browsing, map interaction, a details dialog, and route estimation. It does not provide reservations, turn-by-turn navigation, a live business-hours feed, or a live traffic feed. Map tiles and routing require an internet connection.

## 2. Study area and dataset

The study area is Rawalpindi, Punjab, Pakistan. The map shows cafe records distributed across the neighborhoods represented in the dataset. The application currently contains 37 cafe and coffee-shop records.

### 2.1 Geographic coverage

Neighborhood labels include Saddar, Bahria Town, Satellite Town, Chaklala, Khanna, Shamsabad, Bagh Sardaran, Sadiqabad, Westridge, DHA Phase 4, DHA Phase 1, Lalkurti, Chaklala Cantt, and a general Rawalpindi category. These are grouping labels for search and filtering; they are not administrative boundary polygons.

### 2.2 Record fields

| Field | Use | Data note |
|---|---|---|
| Cafe name | Identify and search listings | Names can change. |
| Neighborhood | Filter listings and orient users | Labels represent broad areas. |
| Rating | Compare listed places | Snapshot; may change. |
| Review count | Provide context for the rating | Snapshot; may change. |
| Latitude and longitude | Place a marker on the map | Approximate neighborhood position. |
| Phone and opening hours | Follow the current external listing | Not stored or verified in this static dataset. |

### 2.3 Data quality and attribution

The application cites [WorldCafeMap's Rawalpindi cafe directory](https://worldcafemap.com/en/pakistan/rawalpindi/cafes) as its listing reference. The bundled records contain coordinates, rating snapshots, and review-count snapshots. The pins are approximate and should be checked against a current venue listing before travel. The details dialog links to Google Maps for current phone and opening-hour information when available.

The map uses OpenStreetMap-based tiles and retains visible map attribution. OSRM supplies route geometry and a traffic-free baseline duration. Google Maps supplies external listing and current traffic-aware direction links. These services provide different inputs; none is a live update feed into the local cafe dataset.

## 3. System design

The interface is organized to keep listing discovery, spatial context, and travel controls within a single browsing flow.

### 3.1 Interface components

| Component | Purpose |
|---|---|
| Animated landing page | Introduces the project and opens the cafe directory. |
| Cafe sidebar | Searches, filters, and displays the 37 listing cards. |
| Interactive map | Shows the basemap, cafe markers, selected area, and route overlay. |
| Cafe details dialog | Shows a short overview, rating snapshot, phone lookup link, and embedded map context. |
| Project and drive panel | Shows course metadata, route controls, estimate status, and a live-directions link. |

The visual style uses warm cafe-inspired colors and brown markers. The dashboard places the map in the center, the cafe list to the left, and project/travel details to the right on wide screens. Side panels can scroll independently. The landing page places its Explore the cafes action beneath the animated coffee cup.

### 3.2 User workflow

1. Open the landing page and select **Explore the cafes**.
2. Search by cafe name or select a neighborhood filter.
3. Select a card to focus the map; select **Details** to open the in-site dialog.
4. Review the rating and review snapshots and follow the Google Maps listing for current business details.
5. Select **Try sample route** for a demonstration, or **Use my location** to request a route from the device after granting browser permission.
6. Follow the Google Maps directions link for current traffic-aware routing.

## 4. Methodology

Cafe records are stored in a JavaScript array and rendered into listing cards and Leaflet markers. Searching matches the cafe name and neighborhood. The neighborhood selector narrows the same record set. Selecting a listing uses its stored coordinates to move the map focus.

### 4.1 Directory preparation

Each bundled record contains a name, neighborhood, rating, review count, latitude, and longitude. The application assigns a page-session ID to each record. It does not geocode place names at runtime. The complete listing and rating snapshot table is provided in Appendix A.

### 4.2 Route estimation

A route can use a sample origin near Bahria Town or a device origin returned after the user grants geolocation permission. The browser sends origin and destination coordinates to the OSRM public demo routing endpoint using a driving profile. The returned route geometry is drawn on the Leaflet map, and the interface displays the returned distance and a duration adjusted by the application's time band.

### 4.3 Time-of-day adjustment

OSRM's duration is a traffic-free baseline. The application multiplies it by a simple heuristic based on the local hour and day:

| Time band | Condition in the app | Multiplier |
|---|---|---:|
| Peak hour | Weekday, 07:00-10:00 or 16:00-20:00 | 1.55 |
| Busy | 10:00-16:00 or 20:00-22:00 | 1.25 |
| Quieter hours | All other times | 1.08 |

The result is rounded to minutes with a one-minute minimum. The multiplier does not query traffic sensors, incidents, road closures, or weather. For current traffic conditions, use the Google Maps directions link.

## 5. Technical implementation

The project runs as a static web application. It has no build step and no server-side cafe database.

### 5.1 Technology stack

| Technology or service | Role |
|---|---|
| HTML | Landing page, dashboard panels, filters, controls, and details dialog markup. |
| CSS | Dashboard layout, cafe theme, responsive behavior, scrolling, cursor, and animation. |
| JavaScript | Directory records, search, selection, map markers, geolocation, and route requests. |
| Leaflet.js 1.9.4 | Browser map, tile layers, markers, controls, and route display. |
| OpenStreetMap-based tiles | Geographic basemap context. |
| Browser Geolocation API | Optional device coordinates after user permission. |
| OSRM public demo | Driving route geometry, distance, and baseline duration. |
| Google Maps links | Current venue listing details and traffic-aware directions. |

### 5.2 Application behavior

The HTML loads Leaflet and the project scripts. The JavaScript renders the cafe array into the left-hand directory and places matching markers on the map. Selecting a listing changes the map focus and active card. The Details action opens an accessible modal dialog in the current page. The route workflow draws OSRM GeoJSON geometry through Leaflet. A time band adjusts the displayed duration and labels it as an estimate.

## 6. Results and outputs

The application provides a 37-place cafe directory with neighborhood search and filtering, rating and review-count snapshots, brown cafe-themed markers, an in-site details dialog, an animated landing page, a sample route control, and optional device-location routing. The README report and the project files are intended to help reviewers understand both the interface and its data limits.

The map helps compare the approximate distribution of listings across the represented neighborhoods. The displayed route is based on a public road-routing service. Cafe phone numbers and opening hours remain external rather than being represented as verified fields in this repository.

## 7. Limitations and responsible use

- Rating values and review counts are snapshots, not a live feed.
- Cafe names and neighborhood labels may be incomplete or out of date.
- Stored coordinates are approximate and may not identify a storefront entrance.
- Phone numbers and opening hours are not stored in the application data.
- The duration multiplier is a heuristic layered on a traffic-free route.
- Actual traffic, incidents, road closures, weather, parking, and travel mode changes are not modeled by this estimate.
- Map tiles, routing, and external business details depend on third-party services and internet access.
- Geolocation requires user permission and may be imprecise, especially indoors.

Before traveling, confirm the cafe, contact details, operating hours, and current directions in the linked listing. Retain OpenStreetMap attribution and respect the terms and availability of each external service.

## 8. Recommended improvements

A production directory should verify each cafe against a current venue listing and store a dated source URL, last-confirmed date, and confidence note. A maintained dataset could include phone numbers, hours, accessibility information, and price range with a clear update process. Travel times could use a licensed traffic-aware routing provider. Additional work could include departure-time and travel-mode choices, keyboard-only review, and a small-screen usability and contrast review.

## 9. Conclusion

Pindi Cafe Finder applies WebGIS concepts to a local Rawalpindi use case. It connects cafe records to a map and brings search, neighborhood filtering, selected-place details, and route interaction into one browser interface. The project demonstrates the roles of map data, a JavaScript map library, browser geolocation, and a routing API.

Ratings and review counts should be treated as snapshots, map positions as approximate, and route durations as estimates. The application directs users to Google Maps for current business details and traffic-aware directions rather than presenting those changing values as verified local data.

## 10. WebGIS concepts

### 10.1 OpenStreetMap and Leaflet

OpenStreetMap is a collaborative geographic data project. Leaflet is a JavaScript library for interactive web maps. OpenStreetMap-based services provide map content; Leaflet displays and controls the map in the browser. They have different roles.

### 10.2 Browser geolocation

After the user allows access, the browser Geolocation API can return device coordinates. Accuracy depends on device sensors and surrounding conditions. The app requests location only when the user selects the location feature and handles permission failure with a status message.

### 10.3 Selecting a cafe

A selected record supplies stored coordinates that center the map. The app updates the selected card and map context. If an origin has been set, it can request and display a route. The Details action opens the in-page dialog and an external listing link.

### 10.4 Why a routing API is required

Straight-line distance does not follow roads. A routing service calculates a path over its road network and returns geometry, distance, and duration. Leaflet draws that result but does not compute the road route itself.

## 11. User guide and GitHub Pages deployment

### 11.1 Run locally

1. Download or clone the repository.
2. Open `index.html` in a modern browser with internet access.
3. If browser geolocation is unavailable for a local file, serve the folder through a local static web server or use an HTTPS deployment.
4. Select **Explore the cafes**, search or filter, and open **Details** for a listing.
5. Use **Try sample route** to demonstrate routing without sharing device location. Use **Use my location** only when you want to request a route from your position.

The map, routing service, and Google Maps links require an internet connection.

### 11.2 Deploy with GitHub Pages

1. Open the repository **Settings** and select **Pages**.
2. Choose deployment from the `main` branch and the repository root folder.
3. Save the setting and wait for the published HTTPS URL.
4. Review the landing page, directory, map attribution, dialog, and external links at the published URL.

GitHub Pages serves the static files. It does not provide the project's cafe data as an editable database or host a route service.

## Appendix A. Complete cafe inventory

The following list reproduces the cafe records bundled in `assignment.js`. Ratings and review counts are directory snapshots; approximate coordinate pairs are used for mapping and are not repeated here. Phone numbers and opening hours are not stored in the local records.

| # | Cafe | Neighborhood | Rating snapshot | Review-count snapshot |
|---:|---|---|---:|---:|
| 1 | Tim Hortons Saddar | Saddar | 4.0 | ~587 |
| 2 | Gloria Jean’s Coffees Saddar | Saddar | 4.1 | ~1,251 |
| 3 | Gloria Jean’s Coffees Bahria | Bahria Town | 4.2 | ~1,849 |
| 4 | The Coffee Bean & Tea Leaf Bahria | Bahria Town | 4.3 | ~1,664 |
| 5 | Second Cup Jinnah Park | Chaklala | 4.3 | ~1,031 |
| 6 | Quetta Bolan Cafe Saddar | Saddar | 4.3 | ~783 |
| 7 | Quetta Karachi Cafe Saddar | Saddar | 4.3 | ~23 |
| 8 | Quetta Bilal Cafe Khanna Pul | Khanna | 4.3 | ~1,694 |
| 9 | Meseta Coffee Bahria Phase 4 | Bahria Town | 4.5 | ~1,095 |
| 10 | Cafe Sol Bahria Phase 4 | Bahria Town | 4.3 | ~703 |
| 11 | BR 9 Cafe & Restaurant | Bahria Town | 4.8 | ~349 |
| 12 | Sage Cafe & Grill | Bahria Town | 4.8 | ~553 |
| 13 | Coffee Wagera Bahria | Bahria Town | 4.6 | ~139 |
| 14 | Burning Brownie Bahria | Bahria Town | 4.4 | ~539 |
| 15 | The 22/30 Cafe | Bahria Town | 3.6 | ~35 |
| 16 | KHULA AASMAN Cafe | Bahria Town | 4.2 | ~820 |
| 17 | Sports Hub Club & Cafe | Satellite Town | 4.6 | ~325 |
| 18 | Creamado Satellite Town | Satellite Town | 4.6 | ~78 |
| 19 | ISHQ CAFE | Satellite Town | 4.1 | ~415 |
| 20 | The Gravity Cafe | Shamsabad | 4.9 | ~22 |
| 21 | Quetta Chai Coffee | Bagh Sardaran | 4.3 | ~152 |
| 22 | Cafe De Aroma | Sadiqabad | 4.5 | ~84 |
| 23 | Petman’s Cafe | Saddar | 4.3 | ~140 |
| 24 | Coffee Castle | Westridge | 4.3 | ~94 |
| 25 | Dunkin Donuts Rawalpindi | Chaklala | 4.0 | ~154 |
| 26 | Chaaye Khana DHA Phase 4 | DHA Phase 4 | 4.6 | ~738 |
| 27 | Switch Coffee Company | DHA Phase 1 | 4.9 | ~87 |
| 28 | Caffinity Bahria Phase 7 | Bahria Town | 4.6 | ~37 |
| 29 | Bean \\| Breakfast and Coffee | Bahria Town | 4.6 | ~41 |
| 30 | Tiger Lounge Cafe | Bahria Town | 4.5 | ~28 |
| 31 | GreenO Bahria Town | Bahria Town | 4.2 | ~250 |
| 32 | Quetta Chai Khana Cafe | Bahria Town | 4.2 | ~112 |
| 33 | Coffee Beans Sports Pavilion | Chaklala Cantt | 4.2 | ~5 |
| 34 | Beanz & Bites Lalkurti | Lalkurti | 4.1 | ~95 |
| 35 | The Front Page Cafe | Rawalpindi | 4.3 | ~176 |
| 36 | Pour Speciality Coffee | Bahria Town | 3.7 | ~53 |
| 37 | Coffee Planet Chaklala Scheme 3 | Chaklala | 3.2 | ~30 |

## 12. References and project files

### 12.1 References

- Cafe directory reference: [WorldCafeMap Rawalpindi cafes](https://worldcafemap.com/en/pakistan/rawalpindi/cafes)
- Basemap data attribution: [OpenStreetMap contributors](https://www.openstreetmap.org/copyright)
- Tile provider: [OpenStreetMap.de](https://www.openstreetmap.de/)
- Web map library: [Leaflet](https://leafletjs.com/), version 1.9.4
- Routing service: [OSRM public demo server](https://router.project-osrm.org/)
- Current business listings and traffic-aware directions: [Google Maps](https://www.google.com/maps)

### 12.2 Main project files

| File | Purpose |
|---|---|
| `index.html` | Landing page and dashboard entry point. |
| `assignment.html` | Dashboard markup and layout overrides. |
| `assignment.js` | Cafe records, map, search, details dialog, geolocation, and routing. |
| `assignment.css` | Dashboard and map styling. |
| `landing.css` | Animated landing page and responsive behavior. |
| `cafe-dialog.css` | Cafe details dialog styling. |
| `reports/Rawalpindi_Cafe_Finder_WebGIS_Lab03_Report.docx` | Supplementary formatted Word copy of this report. |

**Report prepared for:** Laiba Rafi, 24-ARID-2217, WebGIS Lab 03  
**Date:** 15 October 2026
