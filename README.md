# Pindi Cafe Finder | WebGIS Lab 03

An interactive cafe-finding and route-estimation dashboard for Rawalpindi, Pakistan.

**Student:** Laiba Rafi (24-ARID-2217)  
**Course:** WebGIS Lab 03  
**Study area:** Rawalpindi, Pakistan

## Project

This single-page WebGIS project presents 37 cafe and coffee-shop listings across Rawalpindi neighborhoods. It combines a searchable and filterable directory, cafe markers on an OpenStreetMap-based basemap, an in-page details dialog, and route-estimation controls.

The landing page introduces the project with a coffee-cup animation. Select **Explore the cafes** to open the directory. Search by cafe or neighborhood, choose a listing, and view its rating snapshot, review-count snapshot, overview, approximate map location, and Google Maps link. Phone numbers and opening hours are not stored in this static dataset; use the linked Google Maps listing for current details.

## Travel estimates

The browser can request device location after the user grants permission. The app requests a driving route from the OSRM public demo service and applies a time-of-day multiplier to its traffic-free duration. This is a planning estimate, not live traffic. The **Open live traffic directions** link opens Google Maps for current directions and ETA.

## Run locally

1. Download or clone this repository.
2. Open `index.html` in a modern browser with an internet connection. If browser geolocation is unavailable for a local file, serve the folder with a local static web server.
3. Allow location access only if you want a route from your current device location. **Try sample route** demonstrates the route interface without sharing your location.

The map, route service, and Google Maps links require internet access. This project does not require a build step or package installation.

## Main files

- `index.html` and `assignment.html` - the landing page and dashboard markup
- `assignment.css` - dashboard, panels, listing cards, markers, and cursor styling
- `landing.css` - animated landing page
- `cafe-dialog.css` - cafe detail dialog styling
- `assignment.js` - cafe records, map interaction, search, details, geolocation, and route estimates
- `reports/Rawalpindi_Cafe_Finder_WebGIS_Lab03_Report.docx` - full numbered project report and cafe inventory

## Data and limitations

The application currently contains 37 records with a cafe name, neighborhood label, rating and review-count snapshots, and stored latitude/longitude coordinates. The application notes WorldCafeMap as its directory source. Listing values can change, coordinates are approximate neighborhood positions, and phone numbers and opening hours are retrieved from the external Google Maps listing rather than maintained in this repository.

The route line and baseline duration come from OSRM public demo routing. Its duration does not contain live traffic. The displayed time-of-day adjustment uses typical hour bands as a rough heuristic and cannot represent actual congestion, incidents, weather, or road closures. For current traffic-aware travel information, follow the Google Maps directions link.

## Sources and attribution

- Cafe directory reference: [WorldCafeMap Rawalpindi cafes](https://worldcafemap.com/en/pakistan/rawalpindi/cafes)
- Basemap data: [OpenStreetMap contributors](https://www.openstreetmap.org/copyright). The map tiles used by the app are served by OpenStreetMap.de.
- Web map library: [Leaflet](https://leafletjs.com/), version 1.9.4
- Route service: [OSRM public demo server](https://router.project-osrm.org/)
- Current business details and traffic directions: Google Maps links opened by the app

Please retain OpenStreetMap attribution when deploying or presenting the map. Public demo services are subject to their own availability and usage policies.

## Report

The report includes a page-indexed contents guide, project background, study area and data model, interface and workflow, methods, implementation, results and limits, a user guide, the complete cafe inventory, and references.
