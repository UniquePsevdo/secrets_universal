const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');

const { NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin } = require('webpack');
const { NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","styles","vendor","main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const postcssPlugins = function () {
    // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
    const importantCommentRe = /@preserve|@license|[@#]\s*source(?:Mapping)?URL|^!/i;
    const minimizeOptions = {
        autoprefixer: false,
        safe: true,
        mergeLonghand: false,
        discardComments: { remove: (comment) => !importantCommentRe.test(comment) }
    };
    return [
        postcssUrl({
            url: (URL) => {
                // Only convert root relative URLs, which CSS-Loader won't process into require().
                if (!URL.startsWith('/') || URL.startsWith('//')) {
                    return URL;
                }
                if (deployUrl.match(/:\/\//)) {
                    // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                    return `${deployUrl.replace(/\/$/, '')}${URL}`;
                }
                else if (baseHref.match(/:\/\//)) {
                    // If baseHref contains a scheme, include it as is.
                    return baseHref.replace(/\/$/, '') +
                        `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
                else {
                    // Join together base-href, deploy-url and the original URL.
                    // Also dedupe multiple slashes into single ones.
                    return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
                }
            }
        }),
        autoprefixer(),
        customProperties({ preserve: true })
    ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};




module.exports = {
    "resolve": {
        "extensions": [
            ".ts",
            ".js"
        ],
        "modules": [
            "./node_modules",
            "./node_modules"
        ],
        "symlinks": true,
        "alias": {
            "rxjs/AsyncSubject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\AsyncSubject.js",
            "rxjs/BehaviorSubject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\BehaviorSubject.js",
            "rxjs/InnerSubscriber": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\InnerSubscriber.js",
            "rxjs/Notification": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Notification.js",
            "rxjs/Observable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Observable.js",
            "rxjs/Observer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Observer.js",
            "rxjs/Operator": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Operator.js",
            "rxjs/OuterSubscriber": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\OuterSubscriber.js",
            "rxjs/ReplaySubject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\ReplaySubject.js",
            "rxjs/Rx": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Rx.js",
            "rxjs/Scheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Scheduler.js",
            "rxjs/Subject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Subject.js",
            "rxjs/SubjectSubscription": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\SubjectSubscription.js",
            "rxjs/Subscriber": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Subscriber.js",
            "rxjs/Subscription": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\Subscription.js",
            "rxjs/add/observable/bindCallback": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\bindCallback.js",
            "rxjs/add/observable/bindNodeCallback": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\bindNodeCallback.js",
            "rxjs/add/observable/combineLatest": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\combineLatest.js",
            "rxjs/add/observable/concat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\concat.js",
            "rxjs/add/observable/defer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\defer.js",
            "rxjs/add/observable/dom/ajax": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\dom\\ajax.js",
            "rxjs/add/observable/dom/webSocket": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\dom\\webSocket.js",
            "rxjs/add/observable/empty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\empty.js",
            "rxjs/add/observable/forkJoin": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\forkJoin.js",
            "rxjs/add/observable/from": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\from.js",
            "rxjs/add/observable/fromEvent": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\fromEvent.js",
            "rxjs/add/observable/fromEventPattern": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\fromEventPattern.js",
            "rxjs/add/observable/fromPromise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\fromPromise.js",
            "rxjs/add/observable/generate": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\generate.js",
            "rxjs/add/observable/if": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\if.js",
            "rxjs/add/observable/interval": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\interval.js",
            "rxjs/add/observable/merge": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\merge.js",
            "rxjs/add/observable/never": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\never.js",
            "rxjs/add/observable/of": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\of.js",
            "rxjs/add/observable/onErrorResumeNext": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\onErrorResumeNext.js",
            "rxjs/add/observable/pairs": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\pairs.js",
            "rxjs/add/observable/race": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\race.js",
            "rxjs/add/observable/range": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\range.js",
            "rxjs/add/observable/throw": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\throw.js",
            "rxjs/add/observable/timer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\timer.js",
            "rxjs/add/observable/using": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\using.js",
            "rxjs/add/observable/zip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\observable\\zip.js",
            "rxjs/add/operator/audit": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\audit.js",
            "rxjs/add/operator/auditTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\auditTime.js",
            "rxjs/add/operator/buffer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\buffer.js",
            "rxjs/add/operator/bufferCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferCount.js",
            "rxjs/add/operator/bufferTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferTime.js",
            "rxjs/add/operator/bufferToggle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferToggle.js",
            "rxjs/add/operator/bufferWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\bufferWhen.js",
            "rxjs/add/operator/catch": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\catch.js",
            "rxjs/add/operator/combineAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\combineAll.js",
            "rxjs/add/operator/combineLatest": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\combineLatest.js",
            "rxjs/add/operator/concat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\concat.js",
            "rxjs/add/operator/concatAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\concatAll.js",
            "rxjs/add/operator/concatMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\concatMap.js",
            "rxjs/add/operator/concatMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\concatMapTo.js",
            "rxjs/add/operator/count": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\count.js",
            "rxjs/add/operator/debounce": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\debounce.js",
            "rxjs/add/operator/debounceTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\debounceTime.js",
            "rxjs/add/operator/defaultIfEmpty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\defaultIfEmpty.js",
            "rxjs/add/operator/delay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\delay.js",
            "rxjs/add/operator/delayWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\delayWhen.js",
            "rxjs/add/operator/dematerialize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\dematerialize.js",
            "rxjs/add/operator/distinct": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\distinct.js",
            "rxjs/add/operator/distinctUntilChanged": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\distinctUntilChanged.js",
            "rxjs/add/operator/distinctUntilKeyChanged": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\distinctUntilKeyChanged.js",
            "rxjs/add/operator/do": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\do.js",
            "rxjs/add/operator/elementAt": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\elementAt.js",
            "rxjs/add/operator/every": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\every.js",
            "rxjs/add/operator/exhaust": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\exhaust.js",
            "rxjs/add/operator/exhaustMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\exhaustMap.js",
            "rxjs/add/operator/expand": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\expand.js",
            "rxjs/add/operator/filter": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\filter.js",
            "rxjs/add/operator/finally": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\finally.js",
            "rxjs/add/operator/find": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\find.js",
            "rxjs/add/operator/findIndex": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\findIndex.js",
            "rxjs/add/operator/first": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\first.js",
            "rxjs/add/operator/groupBy": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\groupBy.js",
            "rxjs/add/operator/ignoreElements": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\ignoreElements.js",
            "rxjs/add/operator/isEmpty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\isEmpty.js",
            "rxjs/add/operator/last": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\last.js",
            "rxjs/add/operator/let": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\let.js",
            "rxjs/add/operator/map": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\map.js",
            "rxjs/add/operator/mapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\mapTo.js",
            "rxjs/add/operator/materialize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\materialize.js",
            "rxjs/add/operator/max": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\max.js",
            "rxjs/add/operator/merge": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\merge.js",
            "rxjs/add/operator/mergeAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeAll.js",
            "rxjs/add/operator/mergeMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeMap.js",
            "rxjs/add/operator/mergeMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeMapTo.js",
            "rxjs/add/operator/mergeScan": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\mergeScan.js",
            "rxjs/add/operator/min": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\min.js",
            "rxjs/add/operator/multicast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\multicast.js",
            "rxjs/add/operator/observeOn": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\observeOn.js",
            "rxjs/add/operator/onErrorResumeNext": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\onErrorResumeNext.js",
            "rxjs/add/operator/pairwise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\pairwise.js",
            "rxjs/add/operator/partition": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\partition.js",
            "rxjs/add/operator/pluck": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\pluck.js",
            "rxjs/add/operator/publish": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\publish.js",
            "rxjs/add/operator/publishBehavior": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\publishBehavior.js",
            "rxjs/add/operator/publishLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\publishLast.js",
            "rxjs/add/operator/publishReplay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\publishReplay.js",
            "rxjs/add/operator/race": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\race.js",
            "rxjs/add/operator/reduce": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\reduce.js",
            "rxjs/add/operator/repeat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\repeat.js",
            "rxjs/add/operator/repeatWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\repeatWhen.js",
            "rxjs/add/operator/retry": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\retry.js",
            "rxjs/add/operator/retryWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\retryWhen.js",
            "rxjs/add/operator/sample": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\sample.js",
            "rxjs/add/operator/sampleTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\sampleTime.js",
            "rxjs/add/operator/scan": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\scan.js",
            "rxjs/add/operator/sequenceEqual": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\sequenceEqual.js",
            "rxjs/add/operator/share": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\share.js",
            "rxjs/add/operator/shareReplay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\shareReplay.js",
            "rxjs/add/operator/single": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\single.js",
            "rxjs/add/operator/skip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\skip.js",
            "rxjs/add/operator/skipLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\skipLast.js",
            "rxjs/add/operator/skipUntil": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\skipUntil.js",
            "rxjs/add/operator/skipWhile": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\skipWhile.js",
            "rxjs/add/operator/startWith": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\startWith.js",
            "rxjs/add/operator/subscribeOn": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\subscribeOn.js",
            "rxjs/add/operator/switch": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\switch.js",
            "rxjs/add/operator/switchMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\switchMap.js",
            "rxjs/add/operator/switchMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\switchMapTo.js",
            "rxjs/add/operator/take": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\take.js",
            "rxjs/add/operator/takeLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\takeLast.js",
            "rxjs/add/operator/takeUntil": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\takeUntil.js",
            "rxjs/add/operator/takeWhile": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\takeWhile.js",
            "rxjs/add/operator/throttle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\throttle.js",
            "rxjs/add/operator/throttleTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\throttleTime.js",
            "rxjs/add/operator/timeInterval": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\timeInterval.js",
            "rxjs/add/operator/timeout": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\timeout.js",
            "rxjs/add/operator/timeoutWith": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\timeoutWith.js",
            "rxjs/add/operator/timestamp": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\timestamp.js",
            "rxjs/add/operator/toArray": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\toArray.js",
            "rxjs/add/operator/toPromise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\toPromise.js",
            "rxjs/add/operator/window": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\window.js",
            "rxjs/add/operator/windowCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\windowCount.js",
            "rxjs/add/operator/windowTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\windowTime.js",
            "rxjs/add/operator/windowToggle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\windowToggle.js",
            "rxjs/add/operator/windowWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\windowWhen.js",
            "rxjs/add/operator/withLatestFrom": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\withLatestFrom.js",
            "rxjs/add/operator/zip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\zip.js",
            "rxjs/add/operator/zipAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\add\\operator\\zipAll.js",
            "rxjs/interfaces": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\interfaces.js",
            "rxjs/observable/ArrayLikeObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\ArrayLikeObservable.js",
            "rxjs/observable/ArrayObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\ArrayObservable.js",
            "rxjs/observable/BoundCallbackObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\BoundCallbackObservable.js",
            "rxjs/observable/BoundNodeCallbackObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\BoundNodeCallbackObservable.js",
            "rxjs/observable/ConnectableObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\ConnectableObservable.js",
            "rxjs/observable/DeferObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\DeferObservable.js",
            "rxjs/observable/EmptyObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\EmptyObservable.js",
            "rxjs/observable/ErrorObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\ErrorObservable.js",
            "rxjs/observable/ForkJoinObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\ForkJoinObservable.js",
            "rxjs/observable/FromEventObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\FromEventObservable.js",
            "rxjs/observable/FromEventPatternObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\FromEventPatternObservable.js",
            "rxjs/observable/FromObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\FromObservable.js",
            "rxjs/observable/GenerateObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\GenerateObservable.js",
            "rxjs/observable/IfObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\IfObservable.js",
            "rxjs/observable/IntervalObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\IntervalObservable.js",
            "rxjs/observable/IteratorObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\IteratorObservable.js",
            "rxjs/observable/NeverObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\NeverObservable.js",
            "rxjs/observable/PairsObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\PairsObservable.js",
            "rxjs/observable/PromiseObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\PromiseObservable.js",
            "rxjs/observable/RangeObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\RangeObservable.js",
            "rxjs/observable/ScalarObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\ScalarObservable.js",
            "rxjs/observable/SubscribeOnObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\SubscribeOnObservable.js",
            "rxjs/observable/TimerObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\TimerObservable.js",
            "rxjs/observable/UsingObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\UsingObservable.js",
            "rxjs/observable/bindCallback": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\bindCallback.js",
            "rxjs/observable/bindNodeCallback": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\bindNodeCallback.js",
            "rxjs/observable/combineLatest": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\combineLatest.js",
            "rxjs/observable/concat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\concat.js",
            "rxjs/observable/defer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\defer.js",
            "rxjs/observable/dom/AjaxObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\dom\\AjaxObservable.js",
            "rxjs/observable/dom/WebSocketSubject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\dom\\WebSocketSubject.js",
            "rxjs/observable/dom/ajax": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\dom\\ajax.js",
            "rxjs/observable/dom/webSocket": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\dom\\webSocket.js",
            "rxjs/observable/empty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\empty.js",
            "rxjs/observable/forkJoin": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\forkJoin.js",
            "rxjs/observable/from": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\from.js",
            "rxjs/observable/fromEvent": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\fromEvent.js",
            "rxjs/observable/fromEventPattern": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\fromEventPattern.js",
            "rxjs/observable/fromPromise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\fromPromise.js",
            "rxjs/observable/generate": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\generate.js",
            "rxjs/observable/if": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\if.js",
            "rxjs/observable/interval": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\interval.js",
            "rxjs/observable/merge": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\merge.js",
            "rxjs/observable/never": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\never.js",
            "rxjs/observable/of": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\of.js",
            "rxjs/observable/onErrorResumeNext": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\onErrorResumeNext.js",
            "rxjs/observable/pairs": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\pairs.js",
            "rxjs/observable/race": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\race.js",
            "rxjs/observable/range": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\range.js",
            "rxjs/observable/throw": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\throw.js",
            "rxjs/observable/timer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\timer.js",
            "rxjs/observable/using": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\using.js",
            "rxjs/observable/zip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\observable\\zip.js",
            "rxjs/operator/audit": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\audit.js",
            "rxjs/operator/auditTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\auditTime.js",
            "rxjs/operator/buffer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\buffer.js",
            "rxjs/operator/bufferCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\bufferCount.js",
            "rxjs/operator/bufferTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\bufferTime.js",
            "rxjs/operator/bufferToggle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\bufferToggle.js",
            "rxjs/operator/bufferWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\bufferWhen.js",
            "rxjs/operator/catch": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\catch.js",
            "rxjs/operator/combineAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\combineAll.js",
            "rxjs/operator/combineLatest": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\combineLatest.js",
            "rxjs/operator/concat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\concat.js",
            "rxjs/operator/concatAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\concatAll.js",
            "rxjs/operator/concatMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\concatMap.js",
            "rxjs/operator/concatMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\concatMapTo.js",
            "rxjs/operator/count": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\count.js",
            "rxjs/operator/debounce": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\debounce.js",
            "rxjs/operator/debounceTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\debounceTime.js",
            "rxjs/operator/defaultIfEmpty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\defaultIfEmpty.js",
            "rxjs/operator/delay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\delay.js",
            "rxjs/operator/delayWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\delayWhen.js",
            "rxjs/operator/dematerialize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\dematerialize.js",
            "rxjs/operator/distinct": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\distinct.js",
            "rxjs/operator/distinctUntilChanged": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\distinctUntilChanged.js",
            "rxjs/operator/distinctUntilKeyChanged": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\distinctUntilKeyChanged.js",
            "rxjs/operator/do": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\do.js",
            "rxjs/operator/elementAt": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\elementAt.js",
            "rxjs/operator/every": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\every.js",
            "rxjs/operator/exhaust": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\exhaust.js",
            "rxjs/operator/exhaustMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\exhaustMap.js",
            "rxjs/operator/expand": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\expand.js",
            "rxjs/operator/filter": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\filter.js",
            "rxjs/operator/finally": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\finally.js",
            "rxjs/operator/find": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\find.js",
            "rxjs/operator/findIndex": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\findIndex.js",
            "rxjs/operator/first": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\first.js",
            "rxjs/operator/groupBy": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\groupBy.js",
            "rxjs/operator/ignoreElements": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\ignoreElements.js",
            "rxjs/operator/isEmpty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\isEmpty.js",
            "rxjs/operator/last": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\last.js",
            "rxjs/operator/let": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\let.js",
            "rxjs/operator/map": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\map.js",
            "rxjs/operator/mapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\mapTo.js",
            "rxjs/operator/materialize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\materialize.js",
            "rxjs/operator/max": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\max.js",
            "rxjs/operator/merge": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\merge.js",
            "rxjs/operator/mergeAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\mergeAll.js",
            "rxjs/operator/mergeMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\mergeMap.js",
            "rxjs/operator/mergeMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\mergeMapTo.js",
            "rxjs/operator/mergeScan": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\mergeScan.js",
            "rxjs/operator/min": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\min.js",
            "rxjs/operator/multicast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\multicast.js",
            "rxjs/operator/observeOn": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\observeOn.js",
            "rxjs/operator/onErrorResumeNext": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\onErrorResumeNext.js",
            "rxjs/operator/pairwise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\pairwise.js",
            "rxjs/operator/partition": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\partition.js",
            "rxjs/operator/pluck": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\pluck.js",
            "rxjs/operator/publish": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\publish.js",
            "rxjs/operator/publishBehavior": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\publishBehavior.js",
            "rxjs/operator/publishLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\publishLast.js",
            "rxjs/operator/publishReplay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\publishReplay.js",
            "rxjs/operator/race": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\race.js",
            "rxjs/operator/reduce": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\reduce.js",
            "rxjs/operator/repeat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\repeat.js",
            "rxjs/operator/repeatWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\repeatWhen.js",
            "rxjs/operator/retry": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\retry.js",
            "rxjs/operator/retryWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\retryWhen.js",
            "rxjs/operator/sample": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\sample.js",
            "rxjs/operator/sampleTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\sampleTime.js",
            "rxjs/operator/scan": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\scan.js",
            "rxjs/operator/sequenceEqual": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\sequenceEqual.js",
            "rxjs/operator/share": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\share.js",
            "rxjs/operator/shareReplay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\shareReplay.js",
            "rxjs/operator/single": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\single.js",
            "rxjs/operator/skip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\skip.js",
            "rxjs/operator/skipLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\skipLast.js",
            "rxjs/operator/skipUntil": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\skipUntil.js",
            "rxjs/operator/skipWhile": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\skipWhile.js",
            "rxjs/operator/startWith": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\startWith.js",
            "rxjs/operator/subscribeOn": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\subscribeOn.js",
            "rxjs/operator/switch": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\switch.js",
            "rxjs/operator/switchMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\switchMap.js",
            "rxjs/operator/switchMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\switchMapTo.js",
            "rxjs/operator/take": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\take.js",
            "rxjs/operator/takeLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\takeLast.js",
            "rxjs/operator/takeUntil": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\takeUntil.js",
            "rxjs/operator/takeWhile": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\takeWhile.js",
            "rxjs/operator/throttle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\throttle.js",
            "rxjs/operator/throttleTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\throttleTime.js",
            "rxjs/operator/timeInterval": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\timeInterval.js",
            "rxjs/operator/timeout": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\timeout.js",
            "rxjs/operator/timeoutWith": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\timeoutWith.js",
            "rxjs/operator/timestamp": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\timestamp.js",
            "rxjs/operator/toArray": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\toArray.js",
            "rxjs/operator/toPromise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\toPromise.js",
            "rxjs/operator/window": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\window.js",
            "rxjs/operator/windowCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\windowCount.js",
            "rxjs/operator/windowTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\windowTime.js",
            "rxjs/operator/windowToggle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\windowToggle.js",
            "rxjs/operator/windowWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\windowWhen.js",
            "rxjs/operator/withLatestFrom": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\withLatestFrom.js",
            "rxjs/operator/zip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\zip.js",
            "rxjs/operator/zipAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operator\\zipAll.js",
            "rxjs/operators/audit": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\audit.js",
            "rxjs/operators/auditTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\auditTime.js",
            "rxjs/operators/buffer": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\buffer.js",
            "rxjs/operators/bufferCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\bufferCount.js",
            "rxjs/operators/bufferTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\bufferTime.js",
            "rxjs/operators/bufferToggle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\bufferToggle.js",
            "rxjs/operators/bufferWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\bufferWhen.js",
            "rxjs/operators/catchError": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\catchError.js",
            "rxjs/operators/combineAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\combineAll.js",
            "rxjs/operators/combineLatest": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\combineLatest.js",
            "rxjs/operators/concat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\concat.js",
            "rxjs/operators/concatAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\concatAll.js",
            "rxjs/operators/concatMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\concatMap.js",
            "rxjs/operators/concatMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\concatMapTo.js",
            "rxjs/operators/count": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\count.js",
            "rxjs/operators/debounce": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\debounce.js",
            "rxjs/operators/debounceTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\debounceTime.js",
            "rxjs/operators/defaultIfEmpty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\defaultIfEmpty.js",
            "rxjs/operators/delay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\delay.js",
            "rxjs/operators/delayWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\delayWhen.js",
            "rxjs/operators/dematerialize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\dematerialize.js",
            "rxjs/operators/distinct": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\distinct.js",
            "rxjs/operators/distinctUntilChanged": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\distinctUntilChanged.js",
            "rxjs/operators/distinctUntilKeyChanged": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\distinctUntilKeyChanged.js",
            "rxjs/operators/elementAt": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\elementAt.js",
            "rxjs/operators/every": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\every.js",
            "rxjs/operators/exhaust": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\exhaust.js",
            "rxjs/operators/exhaustMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\exhaustMap.js",
            "rxjs/operators/expand": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\expand.js",
            "rxjs/operators/filter": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\filter.js",
            "rxjs/operators/finalize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\finalize.js",
            "rxjs/operators/find": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\find.js",
            "rxjs/operators/findIndex": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\findIndex.js",
            "rxjs/operators/first": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\first.js",
            "rxjs/operators/groupBy": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\groupBy.js",
            "rxjs/operators/ignoreElements": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\ignoreElements.js",
            "rxjs/operators/index": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\index.js",
            "rxjs/operators/isEmpty": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\isEmpty.js",
            "rxjs/operators/last": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\last.js",
            "rxjs/operators/map": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\map.js",
            "rxjs/operators/mapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\mapTo.js",
            "rxjs/operators/materialize": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\materialize.js",
            "rxjs/operators/max": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\max.js",
            "rxjs/operators/merge": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\merge.js",
            "rxjs/operators/mergeAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\mergeAll.js",
            "rxjs/operators/mergeMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\mergeMap.js",
            "rxjs/operators/mergeMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\mergeMapTo.js",
            "rxjs/operators/mergeScan": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\mergeScan.js",
            "rxjs/operators/min": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\min.js",
            "rxjs/operators/multicast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\multicast.js",
            "rxjs/operators/observeOn": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\observeOn.js",
            "rxjs/operators/onErrorResumeNext": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\onErrorResumeNext.js",
            "rxjs/operators/pairwise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\pairwise.js",
            "rxjs/operators/partition": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\partition.js",
            "rxjs/operators/pluck": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\pluck.js",
            "rxjs/operators/publish": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\publish.js",
            "rxjs/operators/publishBehavior": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\publishBehavior.js",
            "rxjs/operators/publishLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\publishLast.js",
            "rxjs/operators/publishReplay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\publishReplay.js",
            "rxjs/operators/race": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\race.js",
            "rxjs/operators/reduce": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\reduce.js",
            "rxjs/operators/refCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\refCount.js",
            "rxjs/operators/repeat": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\repeat.js",
            "rxjs/operators/repeatWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\repeatWhen.js",
            "rxjs/operators/retry": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\retry.js",
            "rxjs/operators/retryWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\retryWhen.js",
            "rxjs/operators/sample": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\sample.js",
            "rxjs/operators/sampleTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\sampleTime.js",
            "rxjs/operators/scan": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\scan.js",
            "rxjs/operators/sequenceEqual": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\sequenceEqual.js",
            "rxjs/operators/share": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\share.js",
            "rxjs/operators/shareReplay": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\shareReplay.js",
            "rxjs/operators/single": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\single.js",
            "rxjs/operators/skip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\skip.js",
            "rxjs/operators/skipLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\skipLast.js",
            "rxjs/operators/skipUntil": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\skipUntil.js",
            "rxjs/operators/skipWhile": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\skipWhile.js",
            "rxjs/operators/startWith": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\startWith.js",
            "rxjs/operators/subscribeOn": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\subscribeOn.js",
            "rxjs/operators/switchAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\switchAll.js",
            "rxjs/operators/switchMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\switchMap.js",
            "rxjs/operators/switchMapTo": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\switchMapTo.js",
            "rxjs/operators/take": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\take.js",
            "rxjs/operators/takeLast": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\takeLast.js",
            "rxjs/operators/takeUntil": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\takeUntil.js",
            "rxjs/operators/takeWhile": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\takeWhile.js",
            "rxjs/operators/tap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\tap.js",
            "rxjs/operators/throttle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\throttle.js",
            "rxjs/operators/throttleTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\throttleTime.js",
            "rxjs/operators/timeInterval": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\timeInterval.js",
            "rxjs/operators/timeout": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\timeout.js",
            "rxjs/operators/timeoutWith": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\timeoutWith.js",
            "rxjs/operators/timestamp": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\timestamp.js",
            "rxjs/operators/toArray": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\toArray.js",
            "rxjs/operators/window": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\window.js",
            "rxjs/operators/windowCount": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\windowCount.js",
            "rxjs/operators/windowTime": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\windowTime.js",
            "rxjs/operators/windowToggle": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\windowToggle.js",
            "rxjs/operators/windowWhen": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\windowWhen.js",
            "rxjs/operators/withLatestFrom": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\withLatestFrom.js",
            "rxjs/operators/zip": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\zip.js",
            "rxjs/operators/zipAll": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\zipAll.js",
            "rxjs/scheduler/Action": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\Action.js",
            "rxjs/scheduler/AnimationFrameAction": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\AnimationFrameAction.js",
            "rxjs/scheduler/AnimationFrameScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\AnimationFrameScheduler.js",
            "rxjs/scheduler/AsapAction": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\AsapAction.js",
            "rxjs/scheduler/AsapScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\AsapScheduler.js",
            "rxjs/scheduler/AsyncAction": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\AsyncAction.js",
            "rxjs/scheduler/AsyncScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\AsyncScheduler.js",
            "rxjs/scheduler/QueueAction": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\QueueAction.js",
            "rxjs/scheduler/QueueScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\QueueScheduler.js",
            "rxjs/scheduler/VirtualTimeScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\VirtualTimeScheduler.js",
            "rxjs/scheduler/animationFrame": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\animationFrame.js",
            "rxjs/scheduler/asap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\asap.js",
            "rxjs/scheduler/async": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\async.js",
            "rxjs/scheduler/queue": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\scheduler\\queue.js",
            "rxjs/symbol/iterator": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\symbol\\iterator.js",
            "rxjs/symbol/observable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\symbol\\observable.js",
            "rxjs/symbol/rxSubscriber": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\symbol\\rxSubscriber.js",
            "rxjs/testing/ColdObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\testing\\ColdObservable.js",
            "rxjs/testing/HotObservable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\testing\\HotObservable.js",
            "rxjs/testing/SubscriptionLog": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\testing\\SubscriptionLog.js",
            "rxjs/testing/SubscriptionLoggable": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\testing\\SubscriptionLoggable.js",
            "rxjs/testing/TestMessage": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\testing\\TestMessage.js",
            "rxjs/testing/TestScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\testing\\TestScheduler.js",
            "rxjs/util/AnimationFrame": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\AnimationFrame.js",
            "rxjs/util/ArgumentOutOfRangeError": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\ArgumentOutOfRangeError.js",
            "rxjs/util/EmptyError": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\EmptyError.js",
            "rxjs/util/FastMap": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\FastMap.js",
            "rxjs/util/Immediate": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\Immediate.js",
            "rxjs/util/Map": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\Map.js",
            "rxjs/util/MapPolyfill": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\MapPolyfill.js",
            "rxjs/util/ObjectUnsubscribedError": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\ObjectUnsubscribedError.js",
            "rxjs/util/Set": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\Set.js",
            "rxjs/util/TimeoutError": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\TimeoutError.js",
            "rxjs/util/UnsubscriptionError": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\UnsubscriptionError.js",
            "rxjs/util/applyMixins": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\applyMixins.js",
            "rxjs/util/assign": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\assign.js",
            "rxjs/util/errorObject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\errorObject.js",
            "rxjs/util/identity": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\identity.js",
            "rxjs/util/isArray": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isArray.js",
            "rxjs/util/isArrayLike": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isArrayLike.js",
            "rxjs/util/isDate": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isDate.js",
            "rxjs/util/isFunction": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isFunction.js",
            "rxjs/util/isNumeric": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isNumeric.js",
            "rxjs/util/isObject": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isObject.js",
            "rxjs/util/isPromise": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isPromise.js",
            "rxjs/util/isScheduler": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\isScheduler.js",
            "rxjs/util/noop": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\noop.js",
            "rxjs/util/not": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\not.js",
            "rxjs/util/pipe": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\pipe.js",
            "rxjs/util/root": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\root.js",
            "rxjs/util/subscribeToResult": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\subscribeToResult.js",
            "rxjs/util/toSubscriber": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\toSubscriber.js",
            "rxjs/util/tryCatch": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\util\\tryCatch.js",
            "rxjs/operators": "F:\\Programming\\secrets_universal\\node_modules\\rxjs\\_esm5\\operators\\index.js"
        },
        "mainFields": [
            "browser",
            "module",
            "main"
        ]
    },
    "resolveLoader": {
        "modules": [
            "./node_modules",
            "./node_modules"
        ]
    },
    "entry": {
        "main": [
            "./src\\main.ts"
        ],
        "polyfills": [
            "./src\\polyfills.ts"
        ],
        "styles": [
            "./src\\styles.scss"
        ]
    },
    "output": {
        "path": path.join(process.cwd(), "dist\\browser"),
        "filename": "[name].bundle.js",
        "chunkFilename": "[id].chunk.js",
        "crossOriginLoading": false
    },
    "module": {
        "rules": [
            {
                "test": /\.html$/,
                "loader": "raw-loader"
            },
            {
                "test": /\.(eot|svg|cur)$/,
                "loader": "file-loader",
                "options": {
                    "name": "[name].[hash:20].[ext]",
                    "limit": 10000
                }
            },
            {
                "test": /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
                "loader": "url-loader",
                "options": {
                    "name": "[name].[hash:20].[ext]",
                    "limit": 10000
                }
            },
            {
                "exclude": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.css$/,
                "use": [
                    "exports-loader?module.exports.toString()",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    }
                ]
            },
            {
                "exclude": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.scss$|\.sass$/,
                "use": [
                    "exports-loader?module.exports.toString()",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "sass-loader",
                        "options": {
                            "sourceMap": false,
                            "precision": 8,
                            "includePaths": []
                        }
                    }
                ]
            },
            {
                "exclude": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.less$/,
                "use": [
                    "exports-loader?module.exports.toString()",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "less-loader",
                        "options": {
                            "sourceMap": false
                        }
                    }
                ]
            },
            {
                "exclude": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.styl$/,
                "use": [
                    "exports-loader?module.exports.toString()",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "stylus-loader",
                        "options": {
                            "sourceMap": false,
                            "paths": []
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.scss$|\.sass$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "sass-loader",
                        "options": {
                            "sourceMap": false,
                            "precision": 8,
                            "includePaths": []
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.less$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "less-loader",
                        "options": {
                            "sourceMap": false
                        }
                    }
                ]
            },
            {
                "include": [
                    path.join(process.cwd(), "src\\styles.scss")
                ],
                "test": /\.styl$/,
                "use": [
                    "style-loader",
                    {
                        "loader": "css-loader",
                        "options": {
                            "sourceMap": false,
                            "importLoaders": 1
                        }
                    },
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": postcssPlugins
                        }
                    },
                    {
                        "loader": "stylus-loader",
                        "options": {
                            "sourceMap": false,
                            "paths": []
                        }
                    }
                ]
            },
            {
                "test": /\.ts$/,
                "loader": "@ngtools/webpack"
            }
        ]
    },
    "plugins": [
        new NoEmitOnErrorsPlugin(),
        new CopyWebpackPlugin([
            {
                "context": "src",
                "to": "",
                "from": {
                    "glob": "assets/**/*",
                    "dot": true
                }
            },
            {
                "context": "src",
                "to": "",
                "from": {
                    "glob": "favicon.ico",
                    "dot": true
                }
            }
        ], {
            "ignore": [
                ".gitkeep"
            ],
            "debug": "warning"
        }),
        new ProgressPlugin(),
        new CircularDependencyPlugin({
            "exclude": /(\\|\/)node_modules(\\|\/)/,
            "failOnError": false
        }),
        new NamedLazyChunksWebpackPlugin(),
        new HtmlWebpackPlugin({
            "template": "./src\\index.html",
            "filename": "./index.html",
            "hash": false,
            "inject": true,
            "compile": true,
            "favicon": false,
            "minify": false,
            "cache": true,
            "showErrors": true,
            "chunks": "all",
            "excludeChunks": [],
            "title": "Webpack App",
            "xhtml": true,
            "chunksSortMode": function sort(left, right) {
                let leftIndex = entryPoints.indexOf(left.names[0]);
                let rightindex = entryPoints.indexOf(right.names[0]);
                if (leftIndex > rightindex) {
                    return 1;
                }
                else if (leftIndex < rightindex) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }),
        new BaseHrefWebpackPlugin({}),
        new CommonsChunkPlugin({
            "name": [
                "inline"
            ],
            "minChunks": null
        }),
        new CommonsChunkPlugin({
            "name": [
                "vendor"
            ],
            "minChunks": (module) => {
                return module.resource
                    && (module.resource.startsWith(nodeModules)
                        || module.resource.startsWith(genDirNodeModules)
                        || module.resource.startsWith(realNodeModules));
            },
            "chunks": [
                "main"
            ]
        }),
        new SourceMapDevToolPlugin({
            "filename": "[file].map[query]",
            "moduleFilenameTemplate": "[resource-path]",
            "fallbackModuleFilenameTemplate": "[resource-path]?[hash]",
            "sourceRoot": "webpack:///"
        }),
        new CommonsChunkPlugin({
            "name": [
                "main"
            ],
            "minChunks": 2,
            "async": "common"
        }),
        new NamedModulesPlugin({}),
        new AngularCompilerPlugin({
            "mainPath": "main.ts",
            "platform": 0,
            "hostReplacementPaths": {
                "environments\\environment.ts": "environments\\environment.ts"
            },
            "sourceMap": true,
            "tsConfigPath": "src\\tsconfig.app.json",
            "skipCodeGeneration": true,
            "compilerOptions": {}
        })
    ],
    "node": {
        "fs": "empty",
        "global": true,
        "crypto": "empty",
        "tls": "empty",
        "net": "empty",
        "process": true,
        "module": false,
        "clearImmediate": false,
        "setImmediate": false
    },
    "devServer": {
        "historyApiFallback": true
    }
};
