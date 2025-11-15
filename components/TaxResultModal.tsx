import { useEffect, useRef } from 'react';
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { X } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

type TaxResult = {
  grossIncome: number;
  tax: number;
  taxWithRelief: number;
  deductions: number;
  tips?: string[];
};

interface TaxResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: TaxResult | null;
  formatCurrency: (value?: number) => string;
  chartData: PieDataPoint[];
}

export function TaxResultModal({ 
  isOpen, 
  onClose, 
  result, 
  formatCurrency, 
  chartData 
}: TaxResultModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div 
        ref={modalRef}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-300 ease-in-out scale-95 opacity-0"
        style={{
          animation: isOpen ? 'modalFadeIn 0.3s ease-out forwards' : '',
        }}
      >
        <style jsx global>{`
          @keyframes modalFadeIn {
            from { opacity: 0; transform: translateY(20px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          
          @media (max-width: 768px) {
            .modal-content {
              width: 95%;
              max-height: 90vh;
            }
          }
        `}</style>
        
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-[#1E3A8A]">
            Tax Calculation Results
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-130px)] modal-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Gross Income</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(result.grossIncome)}
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Tax Amount</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(result.tax)}
              </p>
            </Card>

            <Card className="p-6 space-y-2 border border-gray-200 hover:border-[#1E3A8A]/50 transition-colors">
              <p className="text-sm text-muted-foreground">Tax with Relief</p>
              <p className="text-2xl font-bold text-[#1E3A8A]">
                {formatCurrency(result.taxWithRelief)}
              </p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tax Breakdown</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent = 0 }) => 
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => formatCurrency(value)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>


          {result.tips && result.tips.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-[#1E3A8A]">
                💡 Tax Tips & Recommendations
              </h3>
              <ul className="space-y-2">
                {result.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#1E3A8A] mr-2">•</span>
                    <span className="text-sm text-muted-foreground">{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        <div className="flex justify-end p-4 bg-gray-50 border-t border-gray-200">
          <Button 
            onClick={onClose}
            className="bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 transition-colors px-6 py-2 rounded-md"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

interface PieDataPoint {
  [key: string]: string | number | undefined;
  name: string;
  value: number;
  percent?: number;
  fill: string;
}
