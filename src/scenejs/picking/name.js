/**
 * Specifies a name for its subtree. These may be nested to create hierarchical
 * names, effectively overlaying semantics onto a scene.
 */
SceneJS.name = function() {
    var cfg = SceneJS._utils.getNodeConfig(arguments);
    var backend = SceneJS._backends.getBackend('naming');
    return SceneJS._utils.createNode(
            function(scope) {
                var params = cfg.getParams(scope);
                var name = params.name;
                if (!name) {
                    throw new SceneJS.exceptions.NodeConfigExpectedException
                            ("Mandatory name node parameter missing: name");
                }
                name = name.replace(/^\s+|\s+$/g, ''); // Trim name
                if (name.length == 0) {
                    throw new SceneJS.exceptions.InvalidNodeConfigException()
                            ("Illegal name node parameter - should not be empty: name");
                }
                backend.pushName(name);
                SceneJS._utils.visitChildren(cfg, scope);
                backend.popName();
            });
};



