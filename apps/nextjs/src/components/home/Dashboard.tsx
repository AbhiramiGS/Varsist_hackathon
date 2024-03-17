import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import Overview from "~/components/home/Overview";

export default function DashboardExample() {
  return (
    <>
      <div className=" flex-col md:flex w-full items-center justify-center">
        <div className="flex flex-row space-x-4 p-8 pt-6">
          <div className="hidden md:flex">
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview width={750} height={400} minHeight={300} minWidth={740} className={"hidden md:flex"}/>                
              </CardContent>
            </Card>
          </div>
          <div className="hidden md:grid gap-4 md:grid-cols-2 lg:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">pH Value</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7.2</div>
                <p className="text-xs text-muted-foreground">
                  +1.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Temperature
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  25.1 <span className="text-sm">°C</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  +5.7% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  0.5 <span className="text-sm">NTU</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  -1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Dissolved Oxygen
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  7.2 <span className="text-sm">mg/L</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  -1.2% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Dissolved Solids
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  0.5 <span className="text-sm">NTU</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  +1% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Water Flow Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  5.2 <span className="text-sm">m³/s</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  -1.2% from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
