import {inject} from "aurelia-framework"
import $ from "bootstrap";

export class App{

  configureRouter(config, router) {
        config.title = 'Lunch Selector';
        // config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
            {route: ['', '/'], name: 'home', moduleId: './modules/home', nav: true, title: 'Home'},
            {route: ':id', name: 'lunchOrder', moduleId: './modules/lunchOrder', nav: false, title: 'Lunch Order'}
        ]);

        this.router = router;

    }
}
