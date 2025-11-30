'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Palette, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getCustomThemeColor,
  setCustomThemeColor,
  resetCustomThemeColor,
  applyCustomThemeColor,
} from './config/theme-colors.config';
import { useTheme } from 'next-themes';
import { HexColorPicker } from 'react-colorful';

interface ThemeColorPickerProps {
  themeId: string;
  themeLabel: string;
  className?: string;
}

export function ThemeColorPicker({
  themeId,
  themeLabel,
  className,
}: ThemeColorPickerProps) {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [secondaryColor, setSecondaryColor] = useState('#48cae4');
  const [isCustom, setIsCustom] = useState(false);

  // Load saved color on mount
  useEffect(() => {
    const savedColor = getCustomThemeColor(themeId);
    if (savedColor) {
      setSecondaryColor(savedColor);
      setIsCustom(true);
    } else {
      // Get default color from CSS
      if (typeof window !== 'undefined') {
        const root = document.documentElement;
        const computed = getComputedStyle(root)
          .getPropertyValue('--setup-secondary')
          .trim();
        if (computed) {
          setSecondaryColor(computed);
        }
      }
    }
  }, [themeId]);

  // Apply color when it changes
  useEffect(() => {
    if (isCustom && theme === themeId) {
      applyCustomThemeColor(themeId, secondaryColor);
    }
  }, [secondaryColor, isCustom, theme, themeId]);

  const handleColorChange = (color: string) => {
    // Ensure color is in hex format
    const hexColor = color.startsWith('#') ? color : `#${color}`;
    setSecondaryColor(hexColor);
    setIsCustom(true);
  };

  const handleSave = () => {
    setCustomThemeColor(themeId, secondaryColor);
    if (theme === themeId) {
      applyCustomThemeColor(themeId, secondaryColor);
    }
    setOpen(false);
  };

  const handleReset = () => {
    resetCustomThemeColor(themeId);
    setIsCustom(false);
    // Reset to default from CSS
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      const computed = getComputedStyle(root)
        .getPropertyValue('--setup-secondary')
        .trim();
      if (computed) {
        setSecondaryColor(computed);
      }
    }
  };

  // Predefined color palette
  const colorPalette = [
    '#48cae4', // Default cyan
    '#0077b6', // Blue
    '#00b4d8', // Light blue
    '#06ffa5', // Green
    '#4ade80', // Light green
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#f97316', // Orange
    '#14b8a6', // Teal
    '#6366f1', // Indigo
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant='ghost'
          size='sm'
          className={cn(
            'text-setup-text hover:text-setup-text hover:bg-setup-secondary/20',
            className
          )}
          title={`Customize ${themeLabel} colors`}
        >
          <Palette className='h-4 w-4' />
          <span className='sr-only'>Customize colors</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-setup-primary border-setup-secondary/30'>
        <DialogHeader>
          <DialogTitle className='text-setup-text'>
            Customize {themeLabel} Colors
          </DialogTitle>
          <DialogDescription className='text-setup-text/70'>
            Choose a secondary color for the {themeLabel} theme. Your preference
            will be saved.
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {/* Color Picker */}
          <div className='space-y-2'>
            <Label className='text-setup-text'>Secondary Color</Label>
            <div className='flex flex-col items-center gap-4'>
              {/* React Colorful Picker */}
              <div className='w-full flex justify-center'>
                <HexColorPicker
                  color={secondaryColor}
                  onChange={handleColorChange}
                  style={{ width: '100%', maxWidth: '300px' }}
                />
              </div>

              {/* Hex Input */}
              <div className='flex items-center gap-3 w-full max-w-xs'>
                <div className='flex-1'>
                  <input
                    type='text'
                    value={secondaryColor}
                    onChange={e => {
                      const value = e.target.value;
                      if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
                        if (
                          value.length === 7 &&
                          /^#[0-9A-Fa-f]{6}$/.test(value)
                        ) {
                          handleColorChange(value);
                        } else {
                          setSecondaryColor(value);
                        }
                      }
                    }}
                    onBlur={e => {
                      const value = e.target.value;
                      if (!/^#[0-9A-Fa-f]{6}$/.test(value)) {
                        // Reset to valid color if invalid
                        setSecondaryColor(secondaryColor);
                      }
                    }}
                    className='w-full rounded-lg border border-setup-secondary/30 bg-setup-primary px-3 py-2 text-setup-text focus:border-setup-secondary focus:outline-none text-center font-mono'
                    placeholder='#48cae4'
                  />
                </div>
                <div
                  className='h-10 w-16 rounded-lg border-2 border-setup-secondary/30'
                  style={{ backgroundColor: secondaryColor }}
                />
              </div>
            </div>
          </div>

          {/* Predefined Color Palette */}
          <div className='space-y-2'>
            <Label className='text-setup-text'>Quick Pick</Label>
            <div className='grid grid-cols-6 gap-2'>
              {colorPalette.map(color => (
                <button
                  key={color}
                  type='button'
                  onClick={() => handleColorChange(color)}
                  className={cn(
                    'h-10 w-full rounded-lg border-2 transition-all hover:scale-110',
                    secondaryColor.toLowerCase() === color.toLowerCase()
                      ? 'border-setup-text ring-2 ring-setup-secondary'
                      : 'border-setup-secondary/30'
                  )}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className='space-y-2'>
            <Label className='text-setup-text'>Preview</Label>
            <div
              className='rounded-lg border border-setup-secondary/30 p-4'
              style={{
                backgroundColor: secondaryColor,
                color: 'white',
              }}
            >
              <p className='font-medium'>Sample Text</p>
              <p className='text-sm opacity-90'>
                This is how your secondary color will look
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={handleReset}
            className='text-setup-text border-setup-secondary/30 hover:bg-setup-secondary/20'
            disabled={!isCustom}
          >
            <RotateCcw className='mr-2 h-4 w-4' />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            className='bg-setup-secondary hover:bg-setup-secondary/80 text-white'
            style={{
              backgroundColor: secondaryColor,
            }}
          >
            Save Color
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
