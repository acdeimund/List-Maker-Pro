/**
 * @fileoverview This file containes objects that represent the 
 * different models a line runs and the parts to be displayed.
 * All or most of the line-specific logic should reside here.
 */

function LineModel() {

  // This object represents the parts to be displayed in a parts list
  // The general structure here is parts[sub-assembly][model][attribute][list].
  const parts = {
    'sub-assembly-1-parts': {
      'SN-110': {
        'BK': ['554548-027', '554546-027', '554550-027', '375238', '390488'],
        'WT': ['554548-030', '554546-030', '554550-030', '370423', '390488'],
        'SS': ['372909    ', '371291    ', '372907    ', '375375', '390488']
      },
      'SN-112': {
        'BK': ['556658-027', '556657-027', '554550-027', '290632', '390488'],
        'WT': ['556658-030', '556657-030', '554550-030', '290635', '390488'],
        'SS': ['719523', '719525    ', '290636', '372907', '390488']
      },
      'NGC-6HC': {
        'CL': ['719524    ', '719522    ', '375870', '375375', '371381', '371381', '374413', '390488'],
      },
      'SN-15': {
        'BK': ['554187-027', '551229-027', '500595-027', '375239', '375239', '506449-027', '500594-027', '556550-027', '506451', '194958', '371509', '193126', '193126', '193126'],
        'WT': ['554187-030', '551229-030', '500595-030', '375239', '375239', '506449-030', '500594-030', '556550-030', '506451', '194958', '371509', '193126', '193126', '193126'],
        'SS': ['819423    ', '907100    ', '195230    ', '375239', '375239', '506448    ', '907126    ', '373631    ', '506451', '194958', '371509', '193126', '193126', '193126']
      },
      'SN-15PT': {
        'BK': ['554949-027', '554953-027', '500569-027', '372630', '373630', '500594-027', '500594-027', '556550-027', '556528-027', '506805', '194958', '371509', '193126', '193126', '193126'],
        'WT': ['554949-030', '554953-030', '500569-030', '372630', '373630', '500594-030', '500594-030', '556550-030', '556528-030', '506805', '194958', '371509', '193126', '193126', '193126'],
        'SS': ['816841    ', '194696    ', '195229    ', '372630', '372630', '907126    ', '373631    ', '373632    ', '506805', '194958', '371509', '193126', '193126', '193126']
      }
    },

    'sub-assembly-2-parts': {
      'SN-110': {
        'BK': {
          'RH': ['520659-027', '123675-027', '123677-027', '120848', '120848', '120848', '120848'],
          'LH': ['520815-027', '126567-027', '126558-027', '120848', '120848', '120848', '120848'],
          'RHLK': ['000000', '000000', '000000', '120848', '120848', '120848', '120848'],
          'LHLK': ['000000', '000000', '000000', '120848', '120848', '120848', '120848']
        },
        'WT': {
          'RH': ['520659-030', '123675-030', '123677-030', '120849', '120849', '120849', '120849'],
          'LH': ['520815-030', '126567-030', '126558-030', '120849', '120849', '120849', '120849'],
          'RHLK': ['000000', '000000', '000000', '120849', '120849', '120849', '120849'],
          'LHLK': ['000000', '000000', '000000', '120849', '120849', '120849', '120849']

        },
        'SS': {
          'RH': ['520803', '123674', '123676', '120850', '120850', '120850', '120850'],
          'LH': ['520804', '128947', '128948', '120850', '120850', '120850', '120850'],
          'RHLK': ['000000', '000000', '000000', '120850', '120850', '120850', '120850'],
          'LHLK': ['000000', '000000', '000000', '120850', '120850', '120850', '120850']
        }
      },

      'NGC-6HC': {
        'SS': {
          'RH': ['687068', '695104', '695103', '387939', '387939', '387939'],
          'LH': ['688940', '695105', '695106', '387939', '387939', '387939'],
          'RHLK': ['000000', '000000', '000000', '387939', '387939', '387939'],
          'LHLK': ['000000', '000000', '000000', '387939', '387939', '387939']

        }
      },

      'NGC-6G': {
        'SS': {
          'RH': ['508383', '508385', '508384', '508386', '508386', '508386'],
          'LH': ['000000', '000000', '000000', '508386', '508386', '508386'],
          'RHLK': ['000000', '000000', '000000', '508386', '508386', '508386'],
          'LHLK': ['000000', '000000', '000000', '508386', '508386', '508386']
        }
      },
    },

    // The sub-assemblys can be flatter and can contain shorter lists.
    'sub-assembly-3-parts': {
      'SN-110': {
        'WT': {
          'RH': ['212072', '509579-030'],
          'LH': ['000000', '509579-030'],
          'RHLK': ['000000', '509579-030'],
          'LHLK': ['000000', '509579-030']

        },
        'SS': {
          'RH': ['000000', '559457'],
          'LH': ['520852', '559457'],
          'RHLK': ['000000', '559457'],
          'LHLK': ['000000', '559457'],


        },
        'BK': {
          'RH': ['520827', '509579-027'],
          'LH': ['223055', '509579-027'],
          'RHLK': ['000000', '509579-027'],
          'LHLK': ['000000', '509579-027']

        }
      },
      'SN-112': {
        'WT': {
          'RH': ['212078', '509579-030'],
          'LH': ['000000', '509579-030'],
          'RHLK': ['000000', '509579-030'],
          'LHLK': ['000000', '509579-030']

        },
        'SS': {
          'RH': ['223095', '559457'],
          'LH': ['000000', '559457'],
          'RHLK': ['000000', '559457'],
          'LHLK': ['000000', '559457']

        },
        'BK': {
          'RH': ['520381', '509579-027'],
          'LH': ['520382', '509579-027'],
          'RHLK': ['000000', '509579-027'],
          'LHLK': ['000000', '509579-027'],


        }
      },
      'SN-15': {
        'SS': {
          'RH': ['290048', '698011'],
          'LH': ['290071', '698011'],
          'RHLK': ['555903', '698011'],
          'LHLK': ['555909', '698011']

        },
        'BK': {
          'RH': ['290047', '197479'],
          'LH': ['290049', '197479'],
          'RHLK': ['955769', '197479'],
          'LHLK': ['955755', '197479']
        }
      },
      'NGC-6G': {
        'SS': {
          'RH': ['508380', '509578'],
          'LH': ['124470', '509578'],
          'RHLK': ['000000', '509578'],
          'LHLK': ['000000', '509578']

        },
      },
      'NGC-6FG': {
        'SS': {
          'RH': ['509078', '509578'],
          'LH': ['509080', '509578'],
          'RHLK': ['000000', '509578'],
          'LHLK': ['000000', '509578'],

        },
      }

    },

    // Some can be very short.
    'sub-assembly-4-parts': {
      'SN-15': {
        'BK': {
          'RH': ['375295', '375268'],
          'LH': ['376353', '376351']
        },
        'SS': {
          'RH': ['375297', '375269'],
          'LH': ['376354', '376352']
        }
      },
    }
  }

  // Constants containing the various options. The options need to be availible
  // in the data structure above, otherwise you will get an error.
  const snExtColors = new Map([
    ['BK', 'Black'], ['WT', 'White'], ['SS', 'Stainless']]);

  const snIntColors = new Map([
    ['WT', 'White'], ['BK', 'Black'], ['CL', 'Clear'],
    ['SS', 'Stainless']]);

  const ngcExtColors = new Map([['CL', "Clear"]]);

  const ngcIntColors = new Map([['CL', "Clear"]]);

  const regHinge = new Map([['RH', 'Rt. Hng'], ['LH', 'Lt. Hng']]);

  const ptHinge = new Map([
    ['RH RH', 'Rt, Rt'], ['RH LH', 'Rt, Lt'],
    ['LH RH', 'Lt, Rt'], ['LH LH', 'Lt, Lt']]);

  /**
  * Class describes options for creating a unit on the line.
  */
  class Model {

    /**
     * Creates a new model. Even if there is only one value, the
     * options need to be passed in as maps.
     * @param {Map} extColor
     * @param {Map} intColor
     * @param {Map} hinge 
     */
    constructor(extColor, intColor, hinge) {
      this.extColor = extColor;
      this.intColor = intColor;
      this.hinge = hinge;
    }
  }

  // An object containing all the models available from this line.
  const models = {
    'SN-110': new Model(snExtColors, snIntColors, regHinge),
    'SN-112': new Model(snExtColors, snIntColors, regHinge),
    'NGC-6HC': new Model(ngcExtColors, ngcIntColors, regHinge),
    'NGC-6F': new Model(ngcExtColors, ngcIntColors, regHinge),
    'NGC-6G': new Model(ngcExtColors, ngcIntColors, regHinge),
    'NGC-6FG': new Model(ngcExtColors, ngcIntColors, regHinge),
    'SN-15': new Model(snExtColors, snIntColors, regHinge),
    'SN-15PT': new Model(snExtColors, snIntColors, ptHinge)
  }

  /**
   * This function defines how each list is added to. The lists themselves are
   * created in the html.
   * @param {Unit} unit - The unit to get the list info for.
   * @param {string} listName - The name of the list to get info for.
   */
  function display(unit, listName) {

    // These should NOT be changed in the switch statement.
    let intFinal = unit.get('intColor');
    let hingeFinal = unit.get('hinge');
    let lock = unit.get('locks') ? 'LK' : '';

    // Variables used  later. I define them now for scope.
    // They may change, so they should always be set before use.
    let frontHinge;
    let backHinge;
    let color;

    if (unit.get('model') === 'SN-15PT') {
      frontHinge = unit.get('hinge').split(' ')[0];
      backHinge = unit.get('hinge').split(' ')[1];
      hingeFinal = frontHinge.charAt(0) + backHinge.charAt(0);
    }

    // Don't display the default color.
    if (intFinal === 'WT') intFinal = '';

    // The main switch statement.
    switch (listName) {

      case 'control': case 'ordered':
        switch (unit.get('model')) {
          case 'SN-110': case 'SN-112': case 'SN-15PT': case 'SN-15':
            return [`${unit.get('model')} ${unit.get('extColor')} ${intFinal} ${hingeFinal} ${lock}`];
          case 'NGC-6HC': case 'NGC-6F': case 'NGC-6G': case 'NGC-6FG':
            return [`${unit.get('model')} ${hingeFinal} ${lock}`];
          default:
            return ['undefined'];
        }

      case 'first':
        switch (unit.get('model')) {
          case 'SN-110': case 'SN-112':
            return [`${unit.get('model')} ${intFinal}`];
          case 'SN-15PT': case 'SN-15':
            return [`${unit.get('model')} ${intFinal} ${lock}`];
          case 'NGC-6HC': case 'NGC-6F': case 'NGC-6G': case 'NGC-6FG':
            return [unit.get('model')];
          default:
            return ['undefined'];
        }

      case 'third':
        switch (unit.get('model')) {
          case 'SN-110': case 'SN-112': case 'NGC-6F': case 'NGC-6FG':
            return ['10-F'];
          case 'NGC-6HC': case 'NGC-6G':
            return ['NGC-6HC'];
          case 'SN-15-PT': case 'SN-15':
            return ['SN-15HC'];
          default:
            return ['undefined'];
        }

      case 'sub1':
        switch (unit.get('model')) {
          case 'SN-15': case 'SN-15PT':
            return;
          case 'SN-110': case 'SN-112': case 'NGC-6F': case 'NGC-6FG':
            return ['F/FG'];
          case 'NGC-6HC': case 'NGC-6G':
            return [unit.get('model')];
          default:
            return ['undefined'];
        }

      case 'sub2':
        switch (unit.get('model')) {
          case 'SN-15': case 'SN-15PT':
            return;
          case 'NGC-6HC': case 'NGC-6G':
            return ['NG/G'];
          case 'NGC-6F': case 'NGC-6FG':
            return ['F/FG'];
          case 'SN-110': case 'SN-112':
            return ['SN'];
          default:
            return ['undefined'];
        }

      case 'sub3':
        switch (unit.get('model')) {
          case 'SN-15': case 'SN-15PT': case 'NGC-6HC': case 'NGC-6G':
            return;
          case 'SN-110': case 'SN-112': case 'NGC-6F': case 'NGC-6FG':
            return ['cords'];
          default:
            return ['undefined'];
        }

      case 'tally':
        switch (unit.get('model')) {
          case 'SN-110': case 'SN-112':
            return ['SN-110/112'];
          case 'NGC-6HC': case 'NGC-6G': case 'NGC-6F': case 'NGC-6FG': case 'SN-15': case 'SN-15PT':
            return [unit.get('model')];
          default:
            return ['undefined'];
        }

      case 'sub-assembly-1-parts':
        switch (unit.get('model')) {
          case 'NGC-6G': case 'NGC-6F': case 'NGC-6FG': case 'NGC-6HC':
            return parts[listName]['NGC-6HC'][unit.get('extColor')];
          default:
            return parts[listName][unit.get('model')][unit.get('extColor')];
        }

      case 'sub-assembly-2-parts':
        switch (unit.get('model')) {
          case 'SN-15': case 'SN-15PT':
            return;
          case 'SN-110': case 'SN-112':
            return parts[listName]['SN-110'][unit.get('extColor')][hingeFinal];
          case 'NGC-6HC': case 'NGC-6F':
            return parts[listName]['NGC-6HC']['SS'][hingeFinal];
          case 'NGC-6G': case 'NGC-6FG':
            return parts[listName]['NGC-6G']['SS'][hingeFinal];
          default:
            return ['undefined'];
        }

      case 'sub-assembly-3-parts':
        color = unit.get('extColor');
        if (color === 'WT') color = 'BK';
        switch (unit.get('model')) {
          case 'SN-15PT':
            let frontDoor = parts[listName]['SN-15'][color]
            [frontHinge + lock];
            let backDoor = parts[listName]['SN-15'][color]
            [backHinge + lock];
            return frontDoor.concat(backDoor);
          case 'SN-15':
            return parts[listName][unit.get('model')][color]
            [hingeFinal + lock];
          case 'SN-110': case 'SN-112':
            return parts[listName][unit.get('model')][unit.get('extColor')]
            [hingeFinal + lock];
          case 'NGC-6G': case 'NGC-6FG':
            return parts[listName][unit.get('model')]['SS']
            [hingeFinal + lock];
          default:
            return ['undefined'];
        }

      case 'sub-assembly-4-parts':
        color = unit.get('extColor');
        if (color === 'WT') color = 'BK';
        switch (unit.get('model')) {
          case 'SN-15PT':
            let frontSign = parts[listName]['SN-15'][color][frontHinge];
            let backSign = parts[listName]['SN-15'][color][backHinge];
            return frontSign.concat(backSign);
          case 'SN-15':
            return parts[listName][unit.get('model')][color][hingeFinal];
          case 'SN-110': case 'SN-112': case 'NGC-6HC': case 'NGC-6G':
          case 'NGC-6F': case 'NGC-6FG':
            return;
          default:
            return ['undefined'];
        }
    } // End of outer switch statement.
  }

  return {
    getModels: function () {
      return Object.getOwnPropertyNames(models);
    },

    getOptions: function (model, selectionBoxName) {
      return models[model][selectionBoxName];
    },

    getUnitDisplay: function (unit, listName) {
      return display(unit, listName);
    },
  }
}