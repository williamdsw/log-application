import { NgModule } from '@angular/core';

import { AccordionModule } from 'ngx-bootstrap/accordion';

const BOOTSTRAP_MODULES_ROOT = [
    AccordionModule.forRoot ()
];

const BOOTSTRAP_MODULES = [
    AccordionModule
];

@NgModule({
    imports: [BOOTSTRAP_MODULES_ROOT],
    exports: [BOOTSTRAP_MODULES]
})
export class BootstrapModule {}
