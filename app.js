var first, mid, last, val, tileVals;
var elems = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
var chip1 = '<span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--Indigo mdl-color-text--white">';
var chip1DO = '<span class="mdl-chip mdl-chip--contact"><span class="mdl-chip__contact mdl-color--Deep-Orange mdl-color-text--white">';
var chip2 = '</span><span class="mdl-chip__text">';
var chip3 = '</span></span>';

$(function () {
    initalSetup(elems);
    main();

    // Functions for buttons
    $(".reset").on("click", function () {
        $(".tiles").children().remove();
        $(".mdl-textfield__input").val("");
        // $(".mdl-textfield__label").text("Search Text...");
        initalSetup(elems);
        main();
    });

    $(".start").on("click", function () {
        val = $(".mdl-textfield__input").val().toUpperCase();
        setIndexColors(first, mid, last);
        disableStart();
    });

    // TODO: MISSING A CHECK IN THIS!!!!!!
    $(".step").on("click", function () {
        var midVal, firstIndex, lastIndex;
        if (!$(".start").hasClass("hidden")) {
            alert("Cannot step without starting first!");
            return;
        }

        if (val != "") {
            midVal = $(mid).text();
            firstIndex = tileVals.indexOf(first);
            lastIndex = tileVals.indexOf(last);
            if (first > last)
                clearIndexColors(first, mid, last);
                $(".mdl-textfield__input").text(val + " not in array.");
            if (midVal === val) {
                clearIndexColors(first, mid, last);
                setFoundChip(mid, val);
            } else if (midVal > val){
                clearIndexColors(first, mid, last);
                last = tileVals[tileVals.indexOf(mid) - 1];
                mid = getMidTile(firstIndex, tileVals.indexOf(last));
                if (tileVals.indexOf(last) < 0) {
                    notInArray(first, mid, last, val);
                } else {
                    setIndexColors(first, mid, last);
                }
            } else {
                clearIndexColors(first, mid, last);
                first = tileVals[tileVals.indexOf(mid) + 1];
                mid = getMidTile(tileVals.indexOf(first), lastIndex);
                if (tileVals.indexOf(first) < 0) {
                    notInArray(first, mid, last, val);
                } else {
                    setIndexColors(first, mid, last);
                }
            }
        } else {
        alert("Search cannot be empty. Please press reset, and supply a letter to search.");
        }
    });

    function getMidTile(first, last) {
        return tileVals[Math.floor((first + last) / 2)]
    }

    function notInArray (first, mid, last, val) {
        clearIndexColors(first, mid, last);
        $(".mdl-textfield__input").val(val + " not in array.");
        disableStep();
    }

    function disableStep () {
        $(".step").addClass("hidden");
        $(".step-disabled").removeClass("hidden");
    }

    function disableStart () {
        $(".start").addClass("hidden");
        $(".start-disabled").removeClass("hidden");
    }

    function enableStepStart () {
        $(".start").removeClass("hidden");
        $(".start-disabled").addClass("hidden");
        $(".step").removeClass("hidden");
        $(".step-disabled").addClass("hidden");
    }

    function main () {
        tileVals = $(".mdl-card__title-text").toArray();
        first = tileVals[0];
        last  = tileVals[tileVals.length - 1];
        mid = getMidTile(0, tileVals.length - 1);
    }

    /**
    * Addes chips to the first, mid, and last cards
    */
    function setIndexColors (first, mid, last) {
        var f, m, l, currF, currM, currL;
        f = $(first).parent().next();
        l = $(last).parent().next();
        m = $(mid).parent().next();
        currF = f.text();
        currM = m.text();
        currL = l.text();
        if (currF == currM && currM == currL) {
            f.html(chip1 + currF  + chip2 + "ALL" + chip3);
        } else if (currM == currL) {
            f.html(chip1 + currF  + chip2 + "FIRST" + chip3);
            l.html(chip1 + currL + chip2 + "M / L" + chip3);
        } else if (currF == currM) {
            f.html(chip1 + currF + chip2 + "F / M" + chip3);
            l.html(chip1 + currL + chip2 + "LAST" + chip3);
        } else  {
            f.html(chip1 + currF  + chip2 + "FIRST" + chip3);
            l.html(chip1 + currL + chip2 + "LAST" + chip3);
            m.html(chip1 + currM + chip2 + "MID" + chip3);
        }
    }

    function setFoundChip (tile, val) {
        var t, curr;
        t = $(tile).parent().next();
        curr = t.text();
        t.html(chip1DO + curr + chip2 + "FOUND" + chip3);
        disableStep();
        $(".mdl-textfield__input").val(val + " found at index: " + tileVals.indexOf(tile));
    }

    /**
    * Removes chips from the first, mid, and last cards
    */
    function clearIndexColors (first, mid, last) {
        var f, m, l, curr;
        // First
        f = $(first).parent().next();
        curr = f.children().text();
        f.html(curr[0]);

        // Mid
        m = $(mid).parent().next();
        curr = m.children().text();
        m.html(curr[0]);

        // Last
        l = $(last).parent().next();
        curr = l.children().text();
        l.html(curr[0]);
    }

    /**
    * Returns the available tiles as an
    * array of associated char values.
    */
    function getTileArray () {
        var tileArray = $(".mdl-card__title-text").toArray();
        var result = [];
        tileArray.forEach(function (item) {
            result.push($(item).text().charCodeAt(0));
      });
      return result;
    }

    /**
    * Sets up the demo.
    */
    function initalSetup (arr) {
        var tilePt1 = "<div class=\"demo-card-square mdl-card mdl-shadow--2dp\"><div class=\"mdl-card__title mdl-card--expand\"><h2 class=\"mdl-card__title-text\">";
        var tilePt2 = "</h2></div><div class=\"mdl-card__supporting-text\">";
        var tilePt3 = "</div></div>";

        var tiles = $(".tiles");
        for (var index = 0; index < arr.length; index++) {
            var completedTile = tilePt1 + arr[index] + tilePt2 + index + tilePt3;
            $(completedTile).appendTo(tiles);
        }
    }
});
