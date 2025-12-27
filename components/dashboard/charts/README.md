# Dashboard Charts

Beautiful, interactive charts for the Fix My Car dashboard using Recharts library.

## Available Charts

### 1. DiagnosticsChart (Line Chart)
- **Purpose**: Shows monthly diagnostics trends
- **Data**: Tracks total diagnostics vs resolved diagnostics over time
- **Colors**: Blue (#3b82f6) for diagnostics, Green (#10b981) for resolved

### 2. IssuesChart (Bar Chart)
- **Purpose**: Displays problem distribution by category
- **Categories**: Engine, Brakes, Electrical, Suspension, Transmission, Others
- **Color**: Purple (#8b5cf6)

### 3. VehicleHealthChart (Pie Chart)
- **Purpose**: Shows vehicle health status distribution
- **Categories**: 
  - Excellent (Green #10b981)
  - Good (Blue #3b82f6)
  - Average (Orange #f59e0b)
  - Poor (Red #ef4444)

### 4. CostAnalysisChart (Area Chart)
- **Purpose**: Tracks maintenance and repair costs over time
- **Data**: Monthly maintenance costs vs repair costs
- **Colors**: Blue gradient for maintenance, Orange gradient for repairs

## Usage

```tsx
import { 
  DiagnosticsChart, 
  IssuesChart, 
  VehicleHealthChart, 
  CostAnalysisChart 
} from "@/components/dashboard/charts";

// In your component
<DiagnosticsChart />
<IssuesChart />
<VehicleHealthChart />
<CostAnalysisChart />
```

## Features

- ✅ Fully responsive design
- ✅ Interactive tooltips
- ✅ Smooth animations
- ✅ Consistent styling with the app theme
- ✅ French language labels
- ✅ Built with Recharts library

## Customization

To customize the data, edit the `data` constant in each chart component file.

## Future Enhancements

- [ ] Connect to real API data
- [ ] Add date range filters
- [ ] Export chart data to CSV/PDF
- [ ] Add more chart types (Radar, Scatter, etc.)
- [ ] Real-time data updates

