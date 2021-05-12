var panelGlobal = this;
var palette = (function () {

    var shapesToLayers = (panelGlobal instanceof Panel) ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) shapesToLayers.text = "Shapes to Layers";
        shapesToLayers.orientation = "column";
        shapesToLayers.alignChildren = ["center", "top"];
        shapesToLayers.spacing = 10;
        shapesToLayers.margins = 16;

    var shapesToLayersButton = shapesToLayers.add("button", undefined, undefined, { name: "shapesToLayersButton" });
        shapesToLayersButton.text = "Shapes to Layers";
        shapesToLayersButton.onClick = function () { main() }

    shapesToLayers.layout.layout(true);
    shapesToLayers.layout.resize();
    shapesToLayers.onResizing = shapesToLayers.onResize = function () { this.layout.resize(); }

    if (shapesToLayers instanceof Window) shapesToLayers.show();


    function main() {
        app.beginUndoGroup("Shapes to Layers");

        var selectedLayers = app.project.activeItem.selectedLayers;
        var allLayers = app.project.activeItem.layers;
        var layers = [];
        var shapeLayerfound = false;

        //use all layers or selected layers
        if (selectedLayers.length > 0) {
            layers = selectedLayers;
        } else {
            for (i = 1; i <= allLayers.length; i++) {
                layers.push(allLayers[i])
            }
        }
        //Duplicate layer delete all shapes after the first
        for (i = 0; i < layers.length; i++) {
            if (layers[i] instanceof ShapeLayer) {
                shapes = layers[i].property("Contents");
                for (j = 1; j <= shapes.numProperties;) {
                    newLayer = layers[i].duplicate();
                    newShape = newLayer.property("Contents");
                    shapes.property(j).remove();
                    newLayer.name = newShape.property(j).name;
                    for (k = 2; k <= newShape.numProperties;) {
                        newShape.property(k).remove();
                    }
                }
                layers[i].remove();
                shapeLayerfound = true;
            }
        }
        if (shapeLayerfound == false) alert("No shape layers found")
    }
}());