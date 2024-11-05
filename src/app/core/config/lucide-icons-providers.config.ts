import {
    Bookmark,
    Compass,
    Ellipsis,
    House,
    LucideAngularModule,
    TriangleAlert,
    User,
} from 'lucide-angular';
import { importProvidersFrom } from '@angular/core';

export const ProvideLucideIcons = importProvidersFrom(
    LucideAngularModule.pick({
        TriangleAlert,
        House,
        Compass,
        User,
        Bookmark,
        Ellipsis,
    })
);
