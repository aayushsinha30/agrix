import { mockMarketPrices } from '@/lib/mock-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Activity, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MarketPrices() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Activity className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline">Live Market Prices</CardTitle>
        </div>
        <CardDescription>
          Live mandi prices for your main crops.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Crop</TableHead>
              <TableHead className="text-right">Price (₹/quintal)</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMarketPrices.map((item, index) => {
              const Icon = item.icon;
              return (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                      <span className="font-medium">{item.crop}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    ₹{item.price.toFixed(2)}
                  </TableCell>
                  <TableCell
                    className={cn(
                      'text-right font-semibold flex justify-end items-center gap-1',
                      item.change > 0 ? 'text-green-500' : 'text-red-500'
                    )}
                  >
                    {item.change > 0 ? (
                      <ArrowUp className="w-4 h-4" />
                    ) : (
                      <ArrowDown className="w-4 h-4" />
                    )}
                    {Math.abs(item.change)}%
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
