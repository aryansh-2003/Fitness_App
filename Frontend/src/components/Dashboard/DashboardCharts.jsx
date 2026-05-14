import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';

export default function DashboardCharts({ chartData }) {
  return (
    <Card className="border-2 border-black/5">
      <CardHeader>
        <CardTitle className="text-sm font-black uppercase tracking-widest text-black flex items-center gap-2">
          <div className="w-1.5 h-4 bg-red-600 rounded-full" /> Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} 
                dy={10}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#000', 
                  border: 'none', 
                  borderRadius: '12px',
                  color: '#fff',
                  fontWeight: 900,
                  fontSize: '12px',
                  textTransform: 'uppercase'
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#dc2626" 
                strokeWidth={4}
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
