'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ChevronDown, GraduationCap, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useCurrentUser } from '@/contexts/userContext';
import { navigationSections } from '../config/navigation';
import { NavItem, SubItem } from '../types/navigation';

interface SidebarContentProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

export function SidebarContent({ collapsed, onNavigate }: SidebarContentProps) {
  const pathname = usePathname();
  const user = useCurrentUser();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  // Check if any subitem is active and open the parent item
  useEffect(() => {
    if (collapsed) return;

    const newOpenItems = new Set<string>();
    navigationSections.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems && item.subItems.length > 0) {
          const hasActiveSubItem = item.subItems.some(subItem => {
            const strippedPathname = pathname.replace(
              /^\/[a-zA-Z-]+(\/|$)/,
              '/'
            );
            return (
              strippedPathname === subItem.href || pathname === subItem.href
            );
          });
          if (hasActiveSubItem) {
            newOpenItems.add(item.href);
          }
        }
      });
    });
    setOpenItems(newOpenItems);
  }, [pathname, collapsed]);

  const toggleItem = (href: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  };

  return (
    <div className='flex h-full flex-col bg-setup-primary'>
      {/* Header */}
      <div className='flex h-16 items-center border-b border-setup-secondary px-4 bg-setup-primary'>
        <div className='flex items-center gap-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-setup-secondary text-setup-text'>
            <GraduationCap className='h-4 w-4' />
          </div>
          {!collapsed && (
            <div className='flex flex-col'>
              <span className='text-lg font-semibold text-setup-text'>
                {process.env.NEXT_PUBLIC_PROJECT_NAME || 'Admin Panel'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className='flex-1 overflow-y-auto py-4 bg-setup-primary'>
        <nav className='space-y-6 px-3'>
          {navigationSections.map(section => {
            // Filter items based on effective role (viewRole if set, otherwise role)
            const roleToCheck = user?.role;
            const filteredItems = section.items.filter(
              (item: NavItem) =>
                !item.roles ||
                item.roles.includes(
                  roleToCheck as 'ADMIN' | 'SUPERADMIN' | 'OWNER'
                )
            );

            if (filteredItems.length === 0) return null;

            return (
              <div key={section.title}>
                {!collapsed && (
                  <h3 className='mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-setup-text'>
                    {section.title}
                  </h3>
                )}
                <div className='space-y-1'>
                  {filteredItems.map((item: NavItem) => {
                    // Remove the locale from the pathname before comparing with item.href
                    const strippedPathname = pathname.replace(
                      /^\/[a-zA-Z-]+(\/|$)/,
                      '/'
                    );
                    const isActive = strippedPathname === item.href;
                    const Icon = item.icon;
                    const isDisabled =
                      item.badge === 'Soon' || item.badge === 'Phase two';
                    const hasSubItems =
                      item.subItems && item.subItems.length > 0;

                    // Get the badge value - either static or dynamic
                    let badgeValue = item.badge;
                    if (item.dynamicBadge) {
                      badgeValue =
                        typeof item.dynamicBadge === 'string'
                          ? item.dynamicBadge
                          : '';
                    }

                    if (collapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>
                            <Link
                              href={isDisabled ? '#' : item.href}
                              onClick={onNavigate}
                              className={cn(
                                'flex items-center justify-center rounded-lg p-2 text-sm transition-all hover:bg-setup-secondary text-setup-text hover:text-setup-text',
                                isActive &&
                                  'bg-setup-secondary text-setup-text',
                                isDisabled &&
                                  'cursor-not-allowed opacity-50 hover:bg-transparent'
                              )}
                            >
                              <Icon className='h-4 w-4' />
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side='right'>
                            {item.title}
                            {item.description && (
                              <p className='text-xs text-setup-text mt-1'>
                                {item.description}
                              </p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    // Render collapsible item with subitems
                    if (hasSubItems && !collapsed) {
                      const isOpen = openItems.has(item.href);
                      const strippedPathname = pathname.replace(
                        /^\/[a-zA-Z-]+(\/|$)/,
                        '/'
                      );
                      const hasActiveSubItem = item.subItems?.some(
                        subItem =>
                          strippedPathname === subItem.href ||
                          pathname === subItem.href
                      );

                      return (
                        <div key={item.href}>
                          <Collapsible
                            open={isOpen}
                            onOpenChange={() => toggleItem(item.href)}
                          >
                            <div className='flex items-center gap-1'>
                              {/* Main item link */}
                              <Link
                                href={isDisabled ? '#' : item.href}
                                onClick={onNavigate}
                                className={cn(
                                  'flex-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-setup-secondary text-setup-text hover:text-setup-text',
                                  (isActive || hasActiveSubItem) &&
                                    'bg-setup-secondary text-setup-text',
                                  isDisabled &&
                                    'cursor-not-allowed opacity-50 hover:bg-transparent'
                                )}
                              >
                                <Icon className='h-4 w-4' />
                                <div className='flex-1'>
                                  <div className='flex items-center gap-2'>
                                    <span className='font-medium'>
                                      {item.title}
                                    </span>
                                    {badgeValue && (
                                      <Badge
                                        variant={
                                          badgeValue === 'Soon' ||
                                          badgeValue === 'Phase two'
                                            ? 'secondary'
                                            : 'default'
                                        }
                                        className='h-5 text-xs bg-setup-secondary text-setup-text border-setup-secondary'
                                      >
                                        {badgeValue}
                                      </Badge>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className='text-xs text-setup-text/70'>
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </Link>

                              {/* Dropdown toggle */}
                              <CollapsibleTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='sm'
                                  className='p-1 h-8 w-8 text-setup-text hover:text-setup-text hover:bg-setup-secondary/50'
                                  onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    toggleItem(item.href);
                                  }}
                                >
                                  <ChevronDown
                                    className={cn(
                                      'h-4 w-4 transition-transform duration-200',
                                      isOpen && 'transform rotate-180'
                                    )}
                                  />
                                </Button>
                              </CollapsibleTrigger>
                            </div>
                            <CollapsibleContent className='space-y-1 mt-1 ml-4'>
                              {item.subItems?.map(
                                (subItem: SubItem & { logoUrl?: string }) => {
                                  const strippedSubPathname = pathname.replace(
                                    /^\/[a-zA-Z-]+(\/|$)/,
                                    '/'
                                  );
                                  const isSubActive =
                                    strippedSubPathname === subItem.href ||
                                    pathname === subItem.href;
                                  const SubIcon = subItem.icon;

                                  return (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      onClick={onNavigate}
                                      className={cn(
                                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-setup-secondary/50 text-setup-text hover:text-setup-text',
                                        isSubActive &&
                                          'bg-setup-secondary/50 text-setup-text font-medium'
                                      )}
                                    >
                                      {subItem.logoUrl ? (
                                        <Avatar className='h-5 w-5'>
                                          <AvatarImage
                                            src={subItem.logoUrl}
                                            alt={subItem.title}
                                          />
                                          <AvatarFallback className='bg-setup-secondary text-setup-text text-xs'>
                                            <SubIcon className='h-3 w-3' />
                                          </AvatarFallback>
                                        </Avatar>
                                      ) : (
                                        <SubIcon className='h-4 w-4' />
                                      )}
                                      <span>{subItem.title}</span>
                                    </Link>
                                  );
                                }
                              )}
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      );
                    }

                    // Render regular item
                    return (
                      <Link
                        key={item.href}
                        href={isDisabled ? '#' : item.href}
                        onClick={onNavigate}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-setup-secondary text-setup-text hover:text-setup-text',
                          isActive && 'bg-setup-secondary text-setup-text',
                          isDisabled &&
                            'cursor-not-allowed opacity-50 hover:bg-transparent'
                        )}
                      >
                        <Icon className='h-4 w-4' />
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium'>{item.title}</span>
                            {badgeValue && (
                              <Badge
                                variant={
                                  badgeValue === 'Soon' ||
                                  badgeValue === 'Phase two'
                                    ? 'secondary'
                                    : 'default'
                                }
                                className='h-5 text-xs bg-setup-secondary text-setup-text border-setup-secondary'
                              >
                                {badgeValue}
                              </Badge>
                            )}
                          </div>
                          {item.description && (
                            <p className='text-xs text-setup-text'>
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
                {!collapsed && (
                  <Separator className='mt-4 bg-setup-secondary' />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className='border-t border-setup-secondary p-4 bg-setup-primary'>
        <div
          className={cn(
            'flex items-center gap-3',
            collapsed ? 'justify-center' : 'justify-between'
          )}
        >
          <Button
            variant='ghost'
            size={collapsed ? 'icon' : 'default'}
            className={cn(
              'text-red-400 hover:text-red-300 hover:bg-setup-secondary',
              collapsed ? 'h-8 w-8' : 'h-8'
            )}
            onClick={() => {
              // Handle logout - you can implement this with your auth system
              window.location.href = '/';
            }}
          >
            <LogOut className='h-4 w-4' />
            {!collapsed && <span className='ml-2'>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
}
