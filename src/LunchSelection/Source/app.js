export class App{

  configureRouter(config, router) {
        config.title = 'Lunch Selector';
        // config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
          {route: [''], name: 'home', moduleId: './modules/home', nav: true, title: 'Home'}
        ]);

        this.router = router;
    }

}
