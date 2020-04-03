# Yeoman Generator for Shopware 5

This projects tries to **reduce the boilerplate** of [Shopware 5](https://www.shopware.com/de/migration/infos-zu-shopware-5/) plugin implementations. 

Most shopware 5 engineers will copy&pasta the same boilerplate all over again to create a new service, register it in xml, create a model or adding some subsriber...

This generator tries to speed up these steps by providing some easy to use generators that create the most common use cases automatically. It uses the common [yeoman](https://yeoman.io/) prompting style.

## Getting Started

To install the generator, link it to your local npm installation and install all the dependencies, using these steps:

### Prerequisites

To provide all the needed dependencies, call 

```
npm install
```

in  *./src/generator-shopware5/* 

### Installing

To install the generator, checkout the repository and call 

```
npm link
```

in the *./src/* directory. This will link the current directory to your local npm installation.

## Running the tests

### And coding style tests

To check the codestyle of this generator call

```
./src/codestyleChecker.sh
```

This will check the code against the [ESLint google](https://github.com/google/eslint-config-google) standard.

## USAGE

This projects defines generators for several use cases. Every one of them will generate new files or add code to existing files. 

Please commit your current work before calling any of the generators. All of the generators should be called in plugin directory (either *custom/plugins* or *custom/project*). 

Every call of a generator will create a json file with the name *.yo-rc.json* inside the current directory. This file will save the last answers to any type of prompt and should therefore be ignored by git.

### Generators

* `yo shopware5`
 
This will create a new plugin in the current directory. This will be the first step when using this generator. It will propmt the user for a name of the new plugin and the minimal supported shopare version - which will most likely by the current installed shopware version.

The output of the command is a folder with the name of the plugin, the base PHP file and the plugin xml file and the logo file. Last but not least it creates the *Resources/service.xml* file, which will be used in most of the other generators.

* `yo shopware5:service`

This will create a service file together with it's interface and register it in the *Resources/service.xml* file. The service file will be inserted in the *Components* folder. 
It adds an optional EntityManager dependency.

* `yo shopware5:subscriber`

This will create a subscriber in the *Subscriber* foler with the choosen name. The subscriber will be registered in the *Resources/service.xml* file.

* `yo shopware5:command`

This will create a command in the *Commands* foler with the choosen name. The command will be registered in the *Resources/service.xml* file.


## FAQ

##### Can I use this generator on existing plugins?

Yes it is possible to use this generator on plugins that were not generated using this generator. But ensure that the *Resources/service.xml* exists and contains the following structure:

```xml
<container xmlns="http://symfony.com/schema/dic/services"
           xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
           xsi:schemaLocation="http://symfony.com/schema/dic/services http://symfony.com/schema/dic/services/services-1.0.xsd">
    <parameters>
    </parameters>
    <services>
        <!-- Abstracts -->

        <!-- Commands -->

        <!-- Services -->

        <!-- Subscriber -->
    </services>
</container>
```

## Versioning

This projects uses [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/SvenMaack/yeoman_shopware5/tags). 

## Authors

* **Sven Maack** - *Initial work* - [Sven Maack](https://github.com/SvenMaack)

See also the list of [contributors](https://github.com/SvenMaack/yeoman_shopware5/contributors) who participated in this project.

## Incoming

For the next tasks see the [Tasks](Tasks.md) file

## License

This project is licensed under the GNU GENERAL PUBLIC LICENSE - see the [LICENSE](LICENSE) file for details

## Acknowledgments
