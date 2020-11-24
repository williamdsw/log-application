import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ManualLogComponent } from './manual-log/manual-log.component';
import { BatchLogComponent } from './batch-log/batch-log.component';
import { SearchLogsComponent } from './search-logs/search-logs.component';

const ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'manual-log', component: ManualLogComponent },
    { path: 'batch-log', component: BatchLogComponent },
    { path: 'search-logs', component: SearchLogsComponent },
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule]
})
export class LogRoutingModule {}
