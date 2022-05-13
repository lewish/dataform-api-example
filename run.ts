import {compile, build, run, dbadapters} from "@dataform/cli";
import { join } from "path";
import { cwd } from "process";


async function main() {
    var projectPath = "example-project";
    var projectConfigOverride = { schemaSuffix: "test" };
    var runConfig = { tags: ["tagtorun"] };
    var billingProjectId = "lewishemens-exp";

    var compiledGraph = await compile({ projectDir: join(cwd(), projectPath), projectConfigOverride });
    console.log(JSON.stringify(compiledGraph, null, 2));
    var dbadapter = await dbadapters.create({
        projectId: billingProjectId,
        location: "US",
        credentials: null // Application default credentials.
    }, "bigquery");
    var executionGraph = await build(compiledGraph, runConfig, dbadapter);
    console.log(JSON.stringify(executionGraph, null, 2));
    var executedGraph = await run(dbadapter, executionGraph).result();
    console.log(JSON.stringify(executedGraph, null, 2));
}

main();