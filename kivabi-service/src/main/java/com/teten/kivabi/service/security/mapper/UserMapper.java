package com.teten.kivabi.service.security.mapper;

import com.teten.kivabi.service.model.User;
import com.teten.kivabi.service.security.dto.AuthenticatedUserDto;
import com.teten.kivabi.service.security.dto.RegistrationRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  User convertToUser(RegistrationRequest registrationRequest);

  AuthenticatedUserDto convertToAuthenticatedUserDto(User user);

  User convertToUser(AuthenticatedUserDto authenticatedUserDto);
}
