"use strict";

function SpellSlotsViewModel() {
	var self = this;
	
	self.slotColors = [
		'progress-bar-red',
		'progress-bar-purple',
		'progress-bar-teal',
		'progress-bar-indigo',
		'progress-bar-brown',
		'progress-bar-yellow',
		'progress-bar-forest',
		'progress-bar-sky',
		'progress-bar-orange',
		'progress-bar-magenta',
		'progress-bar-green',
		'progress-bar-blue'
	];
	
    self.sorts = {
	  'level asc': { field: 'level', direction: 'asc', numeric: true},
	  'level desc': { field: 'level', direction: 'desc', numeric: true},
	  'maxSpellSlots asc': { field: 'maxSpellSlots', direction: 'asc', numeric: true},
	  'maxSpellSlots desc': { field: 'maxSpellSlots', direction: 'desc', numeric: true},
	  'usedSpellSlots asc': { field: 'usedSpellSlots', direction: 'asc', numeric: true},
	  'usedSpellSlots desc': { field: 'usedSpellSlots', direction: 'desc', numeric: true}
	};

	self.slots = ko.observableArray([]);
	self.blankSlot = ko.observable(new Slot());
	self.selecteditem = ko.observable(null);
	self.sort = ko.observable(self.sorts['level asc']);
	self.filter = ko.observable('');

	self.init = function() {
	
	};
	
	self.load = function() {
	};
	
	self.unload = function() {
	
	};
	
	/* UI Methods */
	
	/**
	 * Filters and sorts the slots for presentation in a table.
	 */
    self.filteredAndSortedSlots = ko.computed(function() {
    	var slots = self.slots();
    	
    	if (self.filter() !== '') {
    		//skills = skills.filter(function(a) {});
    	}	
    	
    	return slots.sort(function(a, b) {
    		var asc = self.sort().direction === 'asc' ? true : false;
    		var res = null;
    		
    		var aprop = a[self.sort().field]();
    		var bprop = b[self.sort().field]();
    		
    		if (self.sort().numeric) {
				aprop = parseInt(a[self.sort().field]());
				bprop = parseInt(b[self.sort().field]());
    		}
    		
    		if (asc) {
	    		res = aprop > bprop ? 1 : -1;
    		} else {
	    		res = aprop < bprop ? 1 : -1;
    		}
    		return res;
    	});
    });
    
    /**
     * Determines whether a column should have an up/down/no arrow for sorting.
     */
    self.sortArrow = function(columnName) {
    	var sort = self.sort();
    	var arrow = '';
    	if (columnName === sort.field) {
			if (sort.direction === 'asc') {
				arrow = 'glyphicon glyphicon-arrow-up';
			} else {
				arrow = 'glyphicon glyphicon-arrow-down';
			}
    	}
    	return arrow;
    };

	/**
	 * Given a column name, determine the current sort type & order.
	 */
	self.sortBy = function(columnName) {
		var sort = null
		if (self.sort().field === columnName && self.sort().direction === 'asc') {
			sort = self.sorts[columnName+' desc'];
		} else {
			sort = self.sorts[columnName+' asc'];
		}	
		self.sort(sort);
	};

	//Manipulating spell slots
	self.maxSlotWidth = function() {
		return 100 / self.slots().length;
	};
	
    self.editSlot = function(slot) {
        self.selecteditem(slot);
    };
	
	self.addSlot = function() {
		self.blankSlot().color(self.slotColors.pop());
		self.slots.push(self.blankSlot());
		self.blankSlot(new Slot());
		self.blankSlot().level(self.slots().length + 1);
		self.blankSlot().maxSpellSlots('');
	};
	
	self.removeSlot = function(slot) {
		self.slotColors.push(slot.color());
		self.slots.remove(slot);
	};
	
	self.resetSlots = function() {
		$.map(self.slots(), function(slot, _) {
			slot.usedSpellSlots(0);
		});
	};
				
	self.clear = function() {
		self.slots([]);
	};
};
