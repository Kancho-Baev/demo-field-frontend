import { useState } from 'react';
import { Field } from '@/types';
import { Badge } from './ui/Badge';
import { ChevronDown as ExpandIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FieldItemProps = {
  field: Field;
};

const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(date));
};

const getFieldTypeBadgeVariant = (type: string) => {
  switch (type) {
    case 'TEXT':
      return 'default';
    case 'SELECT':
      return 'success';
    default:
      return 'default';
  }
};

const getOrderType = (orderType: string) => {
  switch (orderType) {
    case 'REVERSE_ALPHABETICAL':
      return 'Reverse Alphabetical';
    case 'ALPHABETICAL':
      return 'Alphabetical';
    default:
      return 'None';
  }
};

const FieldItem = ({ field }: FieldItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        'bg-gray-800 text-gray-100 rounded-lg border border-gray-700 shadow-lg transition-all duration-300 overflow-hidden',
        'hover:border-blue-500 hover:shadow-xl',
        'flex flex-col w-full h-fit',
        isExpanded && 'ring-1 ring-blue-500/30'
      )}
    >
      <div className="p-4 sm:p-6 pb-3 sm:pb-4 flex-shrink-0">
        <div className="flex items-start justify-between mb-3 gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">
              {field.label}
            </h3>
          </div>
          <div className="flex-shrink-0">
            <Badge variant={getFieldTypeBadgeVariant(field.type)}>
              {field.type}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1 flex-shrink-0">
            <span
              className={cn(
                'w-2 h-2 rounded-full flex-shrink-0',
                field.isValueRequired ? 'bg-red-500' : 'bg-green-500'
              )}
            ></span>
            <span className="whitespace-nowrap">
              {field.isValueRequired ? 'Required' : 'Optional'}
            </span>
          </div>
          <div className="text-gray-400 truncate">
            Updated {formatDate(field.updatedAt)}
          </div>
        </div>

        {field.placeholder && (
          <div className="bg-gray-700 rounded-md px-3 py-2 text-xs sm:text-sm text-gray-300 italic border border-gray-600 break-words">
            "{field.placeholder}"
          </div>
        )}
      </div>
      <div className="border-t border-gray-700 flex-shrink-0">
        <button
          data-expand-button
          onClick={handleExpandClick}
          className="w-full px-4 sm:px-6 py-3 text-left hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-between group focus:outline-none focus:bg-gray-700/30"
          aria-expanded={isExpanded}
          aria-controls={`field-details-${field.id}`}
        >
          <span className="text-xs sm:text-sm font-medium text-white">
            {isExpanded ? 'Hide Details' : 'Show Details'}
          </span>
          <ExpandIcon
            className={cn(
              'w-4 h-4 text-gray-400 transition-transform duration-300 group-hover:text-gray-300',
              isExpanded && 'rotate-180'
            )}
          />
        </button>
        <div
          id={`field-details-${field.id}`}
          className={cn(
            'transition-all duration-300 ease-in-out overflow-hidden',
            isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          )}
        >
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 bg-gray-800/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-medium text-white block">
                  Default Value:
                </span>
                <span className="text-gray-300 break-words">
                  {field.defaultValue || 'None'}
                </span>
              </div>
              <div className="space-y-1">
                <span className="font-medium text-white block">
                  Select Type:
                </span>
                <span className="text-gray-300 capitalize break-words">
                  {field.selectType?.toLowerCase().replace('_', ' ') || 'None'}
                </span>
              </div>
              <div className="space-y-1 sm:col-span-2">
                <span className="font-medium text-white block">
                  Order Type:
                </span>
                <span className="text-gray-300 capitalize">
                  {getOrderType(field.orderType || '')}
                </span>
              </div>
            </div>
            {field.type === 'SELECT' && (
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-white block mb-2">
                    Select Type:
                  </span>
                  <Badge variant="warning">
                    {field.selectType?.replace('_', ' ').toLowerCase() ||
                      'Not specified'}
                  </Badge>
                </div>

                {field.options && field.options.length > 0 && (
                  <div>
                    <span className="font-medium text-white block mb-2">
                      Options ({field.options.length}):
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {field.options
                        .slice(0, 4)
                        .map((option: string, index: number) => (
                          <Badge
                            key={`${field.id}_${option}_${index}`}
                            variant="default"
                            className="break-words max-w-full"
                          >
                            <span className="truncate">{option}</span>
                          </Badge>
                        ))}
                      {field.options.length > 4 && (
                        <Badge variant="default">
                          +{field.options.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="pt-3 border-t border-gray-700 text-xs text-gray-400">
              <div className="flex flex-col gap-1">
                <span>Created: {formatDate(field.createdAt)}</span>
                <span className="break-all">ID: {field.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldItem;
