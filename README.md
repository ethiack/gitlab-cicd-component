<!-- MARKDOWN LINKS & IMAGES -->

[version-shield]: https://img.shields.io/github/v/release/ethiack/gitlab-cicd-component?style=for-the-badge
[version-url]: https://github.com/ethiack/gitlab-cicd-component/releases/latest

[license-shield]: https://img.shields.io/github/license/ethiack/gitlab-cicd-component?style=for-the-badge
[license-url]: LICENSE

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/company/ethiack


<!-- README -->
<a name="readme-top"></a>
<div align="center">

<h1>
  <br>
    <img src="assets/logo.png" alt="logo" width="400">
    <br><br>
    Ethiack GitLab CI/CD Component
    <br><br>
</h1>

<h4>Integration of Ethiack's Public API with GitLab CI/CD.</h4>

[![GitHub Release][version-shield]][version-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<hr />


[Introduction](#introduction) •
[Credentials Setup](#credentials-setup) •
[Usage](#usage) •
[License](#license)

</div>

## Introduction

This [GitLab CI/CD component](https://docs.gitlab.com/ee/ci/components/) facilitates the integration of [Ethiack's Public API](https://api.ethiack.com) ([API docs](https://portal.ethiack.com/docs/api/)) for launching scans through [GitLab](https://gitlab.com/) pipelines. By using this library, you can seamlessly incorporate Ethiack's security scanning capabilities into your GitLab workflows, enhancing your CI/CD pipeline with automated security testing.

<p align="right"><small>(<a href="#readme-top">back to top</a>)</small></p>


## Credentials Setup

Using Ethiack's API - and, therefore, this CI/CD component - requires authentication using an *API Key* and *API Secret*, which can be retrieved in [Ethiack's Portal settings page](https://portal.ethiack.com/settings/api). These credentials must be available as environment variables `ETHIACK_API_KEY` and `ETHIACK_API_SECRET`, repectively, whenever the shared library is used.

In your project, go to `Settings » CI/CD » Variables` and add variables `ETHIACK_API_KEY` and `ETHIACK_API_SECRET` with your API Key and API Secret, respectively. 

**Example configuration (API Key)**
   > **Add variable**
   > 
   > __Type__: `Variable (default)`  
   > __Environments__: [Select accordingly]  
   > 
   > __Flags__
   > > &#9745; Protect variable  
   > > &#9745; Mask variable  
   > > &#9745; Expand variable reference  
   > 
   > __Description__ (optional): `Ethiack API Key`
   > __Key__:   `ETHIACK_API_KEY`  
   > __Value__: [YOUR API KEY]  
   >


**Example configuration (API Secret)**
   > **Add variable**
   > 
   > __Type__: `Variable (default)`  
   > __Environments__: [Select accordingly]  
   > 
   > __Flags__
   > > &#9745; Protect variable  
   > > &#9745; Mask variable  
   > > &#9745; Expand variable reference  
   > 
   > __Description__ (optional): `Ethiack API Secret`
   > __Key__:   `ETHIACK_API_SECRET`  
   > __Value__: [YOUR API SECRET]  
   >


> [!CAUTION]
> Ensure that the `Mask Variable` option is enabled in both variables to avoid them being displayed in plain text in the logs. 


> [!NOTE]
> If the keys of these secrets do not match the ones provided above, it is necessary to define (export) explicitly the environment variables `ETHIACK_API_KEY` and `ETHIACK_API_SECRET` in the respective CI/CD pipeline step.


<p align="right"><small>(<a href="#readme-top">back to top</a>)</small></p>


## Usage

> [!NOTE]
> This shared library is fundamentally a wrapper around [Ethiack's Public API](https://api.ethiack.com/), using [Ethiack's Job Manager Package](https://github.com/ethiack/job-manager). For more information, see the [API docs](https://portal.ethiack.com/docs/api/) and refer to the later package.


### **Example:** *Launching a job and waiting for its conclusion*

This pipeline launches a scan for the domain  `https://example.ethiack.com` and waits until it finishes (cf. `--wait` flag). If vulnerabilities with severity `medium` or higher are found, the success of the job is interpreted as failing, and this pipeline step will exit with a non-zero status code (cf. `--fail` flag).

```yaml
include:
  - component: gitlab.com/ethiack/gitlab-cicd-component/ethiack-job-manager@main
    inputs:
      stage: test
      command: launch
      url: https://ethiack.com
      args: --wait --fail --severity medium
```

### **Example:** *Checking the success of a job.*

This pipeline checks the success of a job. It will fail if the respective job has finished and vulnerabilities with severity equal or above `high` were found.

```yaml
include:
  - component: gitlab.com/ethiack/gitlab-cicd-component/ethiack-job-manager@main
    inputs:
      stage: test
      command: success
      uuid: https://ethiack.com
      args: --severity high --fail
```

> [!NOTE]
> For retrieving the success of a job without exiting the pipeline, simply provide the flag `--no-fail` instead of `--fail` in the previous example.


### Available commands

This shared component supports every command provided by [Ethiack's Job Manager Package](https://github.com/ethiack/job-manager). This includes, but is not necessarily limited to, the commands:

<div align="center">

|  Command  	|                      Description                     	| Required Inputs 	|
|:---------:	|:----------------------------------------------------:	|:---------------:	|
| `check`   	| Check if a URL is valid and a job can be submitted   	| `url`           	|
| `launch`  	| Launch a job and, optionally, wait for it to finish. 	| `url`           	|
| `info`    	| Retrieve information about a job.                    	| `uuid`          	|
| `list`    	| List all jobs for the organization.                  	| -               	|
| `status`  	| Retrieve the status of a job.                        	| `uuid`          	|
| `success` 	| Retrieve the success of a job.                       	| `uuid`          	|
| `await`   	| Wait for a job to finish.                            	| `uuid`          	|
| `cancel`  	| Cancel a queued or running job.                      	| `uuid`          	|

</div>

#### Required Inputs


> The `url` input refers to the target Uniform Resource Locator (URL) of the service for which the command is run.

> The `uuid` input refers to the Universal Unique Identifier (UUID) of the job for which the command is run.  


#### Optional Arguments
> The behaviour of these commands can be customized with flags and additional parameters provided inn the `args:` variable in the CI/CD pipeline step (e.g., the `--fail` and `--severity` flags in the examples above). For more information regarding the available options and flags for each command, please refer to the [Job Manager Package](https://github.com/ethiack/job-manager).

<p align="right"><small>(<a href="#readme-top">back to top</a>)</small></p>


## License
Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

<p align="right"><small>(<a href="#readme-top">back to top</a>)</small></p>
