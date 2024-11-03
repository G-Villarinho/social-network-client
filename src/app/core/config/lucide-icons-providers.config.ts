import {
  AlignJustify,
  ChartColumnIncreasing,
  ClockArrowUp,
  Copy,
  Ellipsis,
  FilePenLine,
  ImagePlus,
  Info,
  List,
  LucideAngularModule,
  Palette,
  Plus,
  Presentation,
  Ruler,
  Server,
  ShoppingBasket,
  Trash,
  TriangleAlert,
} from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';

export const ProvideLucideIcons = importProvidersFrom(
  LucideAngularModule.pick({
    AlignJustify,
    ChartColumnIncreasing,
    Presentation,
    List,
    Ruler,
    Palette,
    ClockArrowUp,
    ShoppingBasket,
    Plus,
    ImagePlus,
    Trash,
    Ellipsis,
    Info,
    FilePenLine,
    Copy,
    Server,
    TriangleAlert,
  })
);
