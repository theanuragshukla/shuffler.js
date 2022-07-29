class Resolver{
	constructor(options){
		this.resolve(options);
		this.counter=0
	}
	doResolverEffect(options, callback) {
		const resolveString = options.resolveString;
		const offset = options.offset;
		const partialString = resolveString.substring(0, offset);
		const combinedOptions = Object.assign({}, options, { partialString: partialString });
		this.doRandomiserEffect(combinedOptions, () => {
			const nextOptions = Object.assign({}, options, { offset: offset + 1 });
			if (offset <= resolveString.length) {
				this.doResolverEffect(nextOptions, callback);
			} else if (typeof callback === "function") {
				callback();
			}
		});
	}
	doRandomiserEffect(options, callback) {
		const characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '=']
		const element = options.element;
		const partialString = options.partialString;
		let iterations = options.iterations;
		setTimeout(() => {
			if (iterations >= 0) {
				const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });
				if (iterations === 0) {
					element.textContent = partialString;
				} else {
					element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
				}
				this.doRandomiserEffect(nextOptions, callback);
			} else if (typeof callback === "function") {
				callback();
			}
		}, options.timeout);
	};
	resolve(options) {
		const loop = options.loop===true ? true : false
		const callback = ()=>{
			if(!loop && this.counter >= options.strings.length) return
			this.counter%=options.strings.length
			options.resolveString =(options.constant || '')+ (options.strings[this.counter++] || '') || '';
			this.doResolverEffect(options, callback)
		}
		options.resolveString =(options.constant || '')+ (options.strings[this.counter++] || '') || '';
		options.offset =options.constant ? options.constant.length+1 : 0
		this.doResolverEffect(options, callback);
	} 
}
function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
function randomCharacter(characters) {
	return characters[getRandomInteger(0, characters.length - 1)];
};
new Resolver({
	timeout: 10,
	iterations: 5,
	loop:true,
	constant:"Hello I am ",
	strings: ['Anurag Shukla','web developer'],
	element: document.querySelector('.autoInp') 
})
